# 云开发接入说明

正式版建议先使用微信云开发，这样第一版不需要单独购买服务器。

## 1. 开通云开发

1. 在微信开发者工具中打开项目。
2. 点击顶部“云开发”。
3. 创建环境，例如：`zhiqiao-prod`。
4. 记录环境 ID，后续写入 `app.js`。

## 2. app.js 初始化示例

当前项目已经预留了云开发初始化。开通后修改：

```js
// config/env.js
module.exports = {
  cloudEnabled: true,
  cloudEnvId: "你的云开发环境ID",
  serviceFeeRate: 8
};
```

如果 `cloudEnabled` 是 `false`，小程序会继续使用本地模拟数据，方便演示。

## 3. 数据库集合

建议创建以下集合：

### users

```json
{
  "_id": "openid",
  "role": "worker | substitute | reviewer | company_contact",
  "name": "用户姓名",
  "phone": "手机号",
  "verifyStatus": "pending | approved | rejected",
  "skills": ["门店", "仓储", "制造辅助"],
  "score": 80,
  "createdAt": "date"
}
```

### companies

```json
{
  "_id": "company_id",
  "name": "企业名称",
  "contactName": "联系人",
  "contactPhone": "联系人手机号",
  "verifyStatus": "pending | approved | rejected"
}
```

### orders

```json
{
  "_id": "order_id",
  "publisherOpenid": "openid",
  "companyId": "company_id",
  "title": "岗位名称",
  "location": "地点",
  "startTime": "date",
  "endTime": "date",
  "salary": 260,
  "serviceFeeRate": 8,
  "requirement": "岗位要求",
  "status": "draft | reviewing | open | matched | working | completed | cancelled",
  "createdAt": "date"
}
```

### applications

```json
{
  "_id": "application_id",
  "orderId": "order_id",
  "applicantOpenid": "openid",
  "message": "申请说明",
  "status": "pending | accepted | rejected | cancelled",
  "createdAt": "date"
}
```

### agreements

```json
{
  "_id": "agreement_id",
  "orderId": "order_id",
  "workerOpenid": "openid",
  "substituteOpenid": "openid",
  "companyId": "company_id",
  "status": "draft | signing | signed | void",
  "fileId": "cloud file id"
}
```

### risk_events

```json
{
  "_id": "risk_id",
  "orderId": "order_id",
  "type": "private_trade | no_show | complaint | company_rejected",
  "level": "low | medium | high",
  "status": "open | processing | closed",
  "createdAt": "date"
}
```

## 4. 云函数建议

当前已创建这些云函数骨架：

- login：获取 openid，初始化用户。
- submitOrder：提交、查询代班需求。
- applyOrder：代班者申请接单。
- reviewOrder：平台审核订单。
- updateFulfillment：更新履约状态。
- acceptApplication：确认代班者。
- createAgreement：生成协议记录。
- createRiskEvent：创建异常事件。
- createPayment：创建服务费支付占位单。

## 5. 云函数部署步骤

1. 在微信开发者工具中打开云开发。
2. 右键 `cloudfunctions/login`，选择“上传并部署：云端安装依赖”。
3. 对 `submitOrder`、`applyOrder`、`reviewOrder`、`updateFulfillment`、`acceptApplication`、`createAgreement`、`createRiskEvent`、`createPayment` 重复同样操作。
4. 在云数据库创建 `users`、`orders`、`applications`、`agreements`、`risk_events`、`payments` 等集合。
5. 把 `config/env.js` 中 `cloudEnabled` 改成 `true`，并填入环境 ID。

## 6. 数据库权限建议

第一版建议用“所有端只读写自己创建的数据，管理动作走云函数”的思路：

- users：用户只能读写自己的资料。
- orders：普通用户可读开放订单，创建者可读自己的订单；审核和状态变更走云函数。
- applications：申请者可创建和读取自己的申请；确认申请走云函数。
- agreements：只允许相关三方读取；创建和状态变更走云函数。
- payments：用户只读自己的支付记录；创建支付走云函数。
- risk_events：只允许平台审核员读取和处理。

云数据库规则要结合你的小程序 AppID、openid 和角色字段再细化。

## 7. 暂不建议第一版就做的功能

- 自动法律协议生成。
- 真实工资托管。
- 复杂保证金系统。
- 大规模后台权限系统。

这些功能重要，但应该等业务流程跑通后再做。
