const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event) => {
  const nextStatus = event.approved ? "open" : "rejected";
  await db.collection("orders").doc(event.orderId).update({
    data: {
      status: nextStatus,
      reviewNote: event.reviewNote || "",
      updatedAt: db.serverDate()
    }
  });
  return { orderId: event.orderId, status: nextStatus };
};
