Page({
  data: {
    stats: [],
    tasks: [
      "审核企业授权材料",
      "确认代班者认证状态",
      "跟进协议签署与保险配置",
      "处理履约异常和投诉"
    ]
  },

  onLoad() {
    this.setData({
      stats: getApp().globalData.workbenchStats
    });
  }
});
