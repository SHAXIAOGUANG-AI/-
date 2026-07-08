const orderService = require("../../services/orderService");

Page({
  data: {
    form: {},
    agreed: false,
    preview: {},
    serviceRate: getApp().globalData.serviceRate
  },

  onInput(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [`form.${key}`]: event.detail.value
    });
  },

  toggleAgree() {
    this.setData({ agreed: !this.data.agreed });
  },

  submit() {
    if (!this.data.agreed) {
      wx.showToast({ title: "请先确认合规前提", icon: "none" });
      return;
    }

    if (!this.data.form.title || !this.data.form.date || !this.data.form.company) {
      wx.showToast({ title: "请填写岗位、日期和企业", icon: "none" });
      return;
    }

    const salary = Number(this.data.form.salary || 0);
    const serviceFee = Math.round(salary * this.data.serviceRate) / 100;
    const form = Object.assign({}, this.data.form, {
      salary,
      serviceFeeRate: this.data.serviceRate,
      serviceFee,
      status: "reviewing"
    });

    orderService.submitOrder(form)
      .then((order) => {
        this.setData({ preview: Object.assign({}, form, order) });
        wx.showToast({ title: "已提交审核", icon: "success" });
      })
      .catch(() => {
        wx.showToast({ title: "提交失败", icon: "none" });
      });
  }
});
