const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event) => {
  const riskEvent = {
    orderId: event.orderId,
    type: event.type || "manual_review",
    level: event.level || "medium",
    note: event.note || "",
    status: "open",
    createdAt: db.serverDate(),
    updatedAt: db.serverDate()
  };

  if (!riskEvent.orderId) {
    return { error: "missing orderId" };
  }

  const res = await db.collection("risk_events").add({ data: riskEvent });
  return { riskEvent: { id: res._id, ...riskEvent } };
};
