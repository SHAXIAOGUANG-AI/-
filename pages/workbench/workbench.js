const workflowService = require("../../services/workflowService");

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
  },

  createRiskDemo() {
    workflowService.createRiskEvent({
      orderId: "ORD20260707001",
      type: "manual_review",
      level: "medium",
      note: "平台人工复核演示"
    }).then(() => {
      wx.showToast({ title: "已创建风控记录", icon: "success" });
    }).catch(() => {
      wx.showToast({ title: "创建失败", icon: "none" });
    });
  }
});
