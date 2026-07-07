Page({
  data: {
    items: [
      { title: "手机号绑定", desc: "用于订单沟通和异常联系", status: "待完成" },
      { title: "实名认证", desc: "接单、发布和协议签署前必须完成", status: "待完成" },
      { title: "技能标签", desc: "记录可胜任岗位和工作经验", status: "待完善" },
      { title: "企业授权材料", desc: "发布需求时上传企业同意证明", status: "按订单提交" }
    ]
  },

  startVerify() {
    wx.showToast({ title: "正式版接入微信认证", icon: "none" });
  }
});
