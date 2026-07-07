# 云开发接入说明

正式版建议先使用微信云开发，这样第一版不需要单独购买服务器。

## 1. 开通云开发

1. 在微信开发者工具中打开项目。
2. 点击顶部“云开发”。
3. 创建环境，例如：`zhiqiao-prod`。
4. 记录环境 ID，后续写入 `app.js`。

## 2. app.js 初始化示例

当前项目还没有真实连接云开发。开通后可以在 `App({ ... })` 前加入：

```js
wx.cloud.init({
  env: "你的云开发环境ID",
  traceUser: true
});
```

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

- login：获取 openid，初始化用户。
- submitOrder：提交代班需求。
- reviewOrder：平台审核订单。
- applyOrder：代班者申请接单。
- acceptApplication：确认代班者。
- createAgreement：生成协议记录。
- updateFulfillment：更新履约状态。
- createRiskEvent：创建异常事件。

## 5. 暂不建议第一版就做的功能

- 自动法律协议生成。
- 真实工资托管。
- 复杂保证金系统。
- 大规模后台权限系统。

这些功能重要，但应该等业务流程跑通后再做。
