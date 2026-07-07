const { findOrder, calcServiceFee } = require("../../utils/format");

Page({
  data: {
    order: {},
    serviceFee: 0
  },

  onLoad(options) {
    const orders = getApp().globalData.orders;
    const order = findOrder(orders, options.id);
    this.setData({
      order,
      serviceFee: calcServiceFee(order.salary, order.serviceFeeRate)
    });
  },

  applyOrder() {
    wx.showModal({
      title: "进入申请流程",
      content: "正式版会先校验实名认证、技能标签、协议确认和保险配置，再允许双方沟通。",
      showCancel: false
    });
  },

  goAgreement() {
    wx.navigateTo({ url: "/pages/agreement/agreement" });
  }
});
