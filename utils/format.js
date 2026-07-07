function calcServiceFee(salary, rate) {
  const amount = Number(salary || 0);
  const feeRate = Number(rate || 0);
  return Math.round(amount * feeRate) / 100;
}

function findOrder(orders, id) {
  return orders.find((item) => item.id === id) || orders[0];
}

module.exports = {
  calcServiceFee,
  findOrder
};
