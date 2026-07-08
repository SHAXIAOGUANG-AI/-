const orderService = require("../../services/orderService");

Page({
  data: {
    orders: [],
    loading: true
  },

  onLoad() {
    this.loadOrders();
  },

  onPullDownRefresh() {
    this.loadOrders().finally(() => wx.stopPullDownRefresh());
  },

  loadOrders() {
    this.setData({ loading: true });
    return orderService.listOrders()
      .then((orders) => {
        this.setData({ orders });
      })
      .catch(() => {
        wx.showToast({ title: "订单加载失败", icon: "none" });
      })
      .finally(() => {
        this.setData({ loading: false });
      });
  },

  openDetail(event) {
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?id=${event.currentTarget.dataset.id}`
    });
  },

  contact(event) {
    const orderId = event.currentTarget.dataset.id;
    orderService.applyOrder(orderId, "希望进一步沟通岗位要求")
      .then(() => {
        wx.showModal({
          title: "申请已提交",
          content: `订单 ${orderId} 已进入认证、协议、保险和平台审核流程。`,
          showCancel: false
        });
      })
      .catch(() => {
        wx.showToast({ title: "申请失败", icon: "none" });
      });
  }
});
