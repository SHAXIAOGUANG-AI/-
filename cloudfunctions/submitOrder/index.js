const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

async function listOrders() {
  const res = await db.collection("orders")
    .where({ status: db.command.in(["reviewing", "open", "matched"]) })
    .orderBy("createdAt", "desc")
    .limit(50)
    .get();
  return { orders: res.data };
}

async function getOrder(id) {
  const res = await db.collection("orders").doc(id).get();
  return { order: res.data };
}

async function createOrder(form) {
  const wxContext = cloud.getWXContext();
  const order = {
    ...form,
    publisherOpenid: wxContext.OPENID,
    status: "reviewing",
    createdAt: db.serverDate(),
    updatedAt: db.serverDate()
  };
  const res = await db.collection("orders").add({ data: order });
  return { order: { id: res._id, ...order } };
}

exports.main = async (event) => {
  if (event.action === "list") return listOrders();
  if (event.action === "get") return getOrder(event.id);
  if (event.action === "create") return createOrder(event.form || {});
  return { error: "unknown action" };
};
