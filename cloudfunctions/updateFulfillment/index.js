const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event) => {
  const allowed = ["matched", "working", "completed", "cancelled", "disputed"];
  if (!allowed.includes(event.status)) {
    return { error: "invalid status" };
  }

  await db.collection("orders").doc(event.orderId).update({
    data: {
      status: event.status,
      fulfillmentNote: event.note || "",
      updatedAt: db.serverDate()
    }
  });

  return { orderId: event.orderId, status: event.status };
};
