const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event) => {
  const payment = {
    orderId: event.orderId,
    payerOpenid: event.payerOpenid,
    amount: Number(event.amount || 0),
    type: event.type || "service_fee",
    status: "pending",
    provider: "wechat_pay_placeholder",
    createdAt: db.serverDate(),
    updatedAt: db.serverDate()
  };

  if (!payment.orderId || !payment.payerOpenid || payment.amount <= 0) {
    return { error: "missing required fields" };
  }

  const res = await db.collection("payments").add({ data: payment });
  return {
    payment: { id: res._id, ...payment },
    note: "This is a placeholder. Connect WeChat Pay before production."
  };
};
