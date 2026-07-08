const { callFunction, isCloudReady } = require("./cloud");
const mock = require("../data/mock");

function normalizeOrder(order) {
  if (!order) return order;
  return {
    id: order.id || order._id,
    ...order
  };
}

function listOrders() {
  if (!isCloudReady()) {
    return Promise.resolve(mock.orders);
  }

  return callFunction("submitOrder", { action: "list" })
    .then((res) => (res.result.orders || []).map(normalizeOrder));
}

function getOrder(id) {
  if (!isCloudReady()) {
    return Promise.resolve(mock.orders.find((item) => item.id === id) || mock.orders[0]);
  }

  return callFunction("submitOrder", { action: "get", id })
    .then((res) => normalizeOrder(res.result.order));
}

function submitOrder(form) {
  if (!isCloudReady()) {
    const now = Date.now();
    return Promise.resolve({
      id: `LOCAL${now}`,
      status: "reviewing",
      createdAt: now,
      ...form
    });
  }

  return callFunction("submitOrder", { action: "create", form })
    .then((res) => normalizeOrder(res.result.order));
}

function applyOrder(orderId, message) {
  if (!isCloudReady()) {
    return Promise.resolve({
      orderId,
      message,
      status: "pending"
    });
  }

  return callFunction("applyOrder", { orderId, message }).then((res) => res.result.application);
}

module.exports = {
  listOrders,
  getOrder,
  submitOrder,
  applyOrder
};
