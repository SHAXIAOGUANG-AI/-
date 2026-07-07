Page({
  data: {
    steps: [
      {
        title: "工作者提交代班需求",
        desc: "说明时间、岗位、薪资、企业授权情况和需要释放的日期。"
      },
      {
        title: "企业确认并提供劳务协议",
        desc: "公司明确允许短期代班，平台只撮合合规场景。"
      },
      {
        title: "代班者沟通接单",
        desc: "双方确认岗位要求、薪资、服务费、保险与履约标准。"
      },
      {
        title: "平台跟进履约",
        desc: "平台记录进度，降低私下交易和未完成工作的风险。"
      }
    ],
    benefits: [
      { text: "让工作者用当天工资换取急需的自由时间" },
      { text: "让有空闲时间的人获取合规短期工作" },
      { text: "通过协议、保险、服务费和跟进机制降低风险" }
    ]
  },

  goPublish() {
    wx.switchTab({ url: "/pages/publish/publish" });
  },

  goOrders() {
    wx.switchTab({ url: "/pages/orders/orders" });
  },

  goVerify() {
    wx.navigateTo({ url: "/pages/verify/verify" });
  },

  goAgreement() {
    wx.navigateTo({ url: "/pages/agreement/agreement" });
  },

  goWorkbench() {
    wx.navigateTo({ url: "/pages/workbench/workbench" });
  }
});
