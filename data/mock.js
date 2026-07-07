const orders = [
  {
    id: "ORD20260707001",
    title: "制造岗临时代班",
    company: "杭州某制造企业",
    authStatus: "企业已授权",
    location: "杭州 余杭",
    date: "7月12日 08:30-17:30",
    salary: 260,
    serviceFeeRate: 8,
    insurance: "待购买单日意外险",
    status: "待接单",
    requirement: "按现场主管安排完成物料整理、扫码登记和基础协助工作。",
    workerNote: "工作者需提前释放一天时间处理家庭事务。",
    compliance: ["企业授权", "劳务协议", "短期保险", "平台跟进"]
  },
  {
    id: "ORD20260707002",
    title: "门店整理与补货",
    company: "上海某连锁门店",
    authStatus: "协议待确认",
    location: "上海 闵行",
    date: "7月15日-7月16日 10:00-18:00",
    salary: 220,
    serviceFeeRate: 8,
    insurance: "含短期意外险",
    status: "审核中",
    requirement: "整理货架、补货、简单盘点，不涉及收银和敏感权限。",
    workerNote: "发布后需补充企业负责人确认信息。",
    compliance: ["企业授权待补充", "劳务协议", "短期保险"]
  }
];

const userProfile = {
  name: "未认证用户",
  role: "工作者 / 代班者",
  verifyStatus: "未认证",
  phoneStatus: "未绑定",
  score: 80
};

const workbenchStats = [
  { label: "待审核需求", value: 6 },
  { label: "待签协议", value: 3 },
  { label: "履约中订单", value: 2 },
  { label: "异常跟进", value: 1 }
];

module.exports = {
  orders,
  userProfile,
  workbenchStats
};
