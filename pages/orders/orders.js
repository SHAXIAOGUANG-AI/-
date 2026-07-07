Page({
  data: {
    orders: []
  },

  onLoad() {
    this.setData({
      orders: getApp().globalData.orders
    });
  },

  openDetail(event) {
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?id=${event.currentTarget.dataset.id}`
    });
  },

  contact(event) {
    wx.showModal({
      title: "申请沟通",
      content: `订单 ${event.currentTarget.dataset.id} 将进入认证、协议、保险和平台审核流程。`,
      showCancel: false
    });
  }
});
