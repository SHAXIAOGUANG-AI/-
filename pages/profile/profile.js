Page({
  data: {
    profile: {},
    risks: [
      {
        title: "防止私下交易",
        desc: "正式版可用平台沟通、订单编号、服务费和协议流程减少跳单。"
      },
      {
        title: "防止履约失败",
        desc: "正式版需要加入身份认证、技能标签、履约评价和保证金机制。"
      },
      {
        title: "防止违法替岗",
        desc: "只允许企业授权后的短期劳务合作，不承接未授权岗位替换。"
      }
    ],
    tools: [
      {
        name: "微信开发者工具",
        desc: "打开这个项目并预览小程序。"
      },
      {
        name: "微信小程序账号",
        desc: "真正发布上线时需要注册。原型阶段可用测试号。"
      },
      {
        name: "后端和数据库",
        desc: "正式版需要保存用户、订单、协议、支付和评价数据。"
      }
    ]
  },

  onLoad() {
    this.setData({
      profile: getApp().globalData.userProfile
    });
  },

  goVerify() {
    wx.navigateTo({ url: "/pages/verify/verify" });
  },

  goWorkbench() {
    wx.navigateTo({ url: "/pages/workbench/workbench" });
  }
});
