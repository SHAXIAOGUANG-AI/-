const { callFunction, isCloudReady } = require("./cloud");

function acceptApplication(application) {
  if (!isCloudReady()) {
    return Promise.resolve({
      applicationId: application.applicationId,
      orderId: application.orderId,
      status: "matched"
    });
  }

  return callFunction("acceptApplication", application).then((res) => res.result);
}

function createAgreement(data) {
  if (!isCloudReady()) {
    return Promise.resolve({
      agreement: {
        id: `LOCAL_AGREEMENT_${Date.now()}`,
        status: "draft",
        ...data
      }
    });
  }

  return callFunction("createAgreement", data).then((res) => res.result);
}

function createRiskEvent(data) {
  if (!isCloudReady()) {
    return Promise.resolve({
      riskEvent: {
        id: `LOCAL_RISK_${Date.now()}`,
        status: "open",
        ...data
      }
    });
  }

  return callFunction("createRiskEvent", data).then((res) => res.result);
}

function createPayment(data) {
  if (!isCloudReady()) {
    return Promise.resolve({
      payment: {
        id: `LOCAL_PAYMENT_${Date.now()}`,
        status: "pending",
        ...data
      },
      note: "本地演示支付占位"
    });
  }

  return callFunction("createPayment", data).then((res) => res.result);
}

module.exports = {
  acceptApplication,
  createAgreement,
  createRiskEvent,
  createPayment
};
