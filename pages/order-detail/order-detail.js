const { calcServiceFee } = require("../../utils/format");
const orderService = require("../../services/orderService");
const workflowService = require("../../services/workflowService");

Page({
  data: {
    order: {},
    serviceFee: 0,
    loading: true
  },

  onLoad(options) {
    orderService.getOrder(options.id)
      .then((order) => {
        this.setData({
          order,
          serviceFee: calcServiceFee(order.salary, order.serviceFeeRate),
          loading: false
        });
      })
      .catch(() => {
        wx.showToast({ title: "订单加载失败", icon: "none" });
        this.setData({ loading: false });
      });
  },

  applyOrder() {
    orderService.applyOrder(this.data.order.id, "申请接单")
      .then(() => {
        wx.showModal({
          title: "申请已提交",
          content: "系统会先校验实名认证、技能标签、协议确认和保险配置，再允许双方沟通。",
          showCancel: false
        });
      })
      .catch(() => {
        wx.showToast({ title: "申请失败", icon: "none" });
      });
  },

  goAgreement() {
    wx.navigateTo({ url: "/pages/agreement/agreement" });
  },

  createPaymentDemo() {
    workflowService.createPayment({
      orderId: this.data.order.id,
      payerOpenid: "local-demo-openid",
      amount: this.data.serviceFee,
      type: "service_fee"
    }).then(() => {
      wx.showToast({ title: "支付单已创建", icon: "success" });
    }).catch(() => {
      wx.showToast({ title: "创建失败", icon: "none" });
    });
  }
});
