const env = require("../config/env");

function isCloudReady() {
  return env.cloudEnabled && env.cloudEnvId && env.cloudEnvId !== "请填写你的云开发环境ID";
}

function initCloud() {
  if (!wx.cloud || !isCloudReady()) {
    return false;
  }

  wx.cloud.init({
    env: env.cloudEnvId,
    traceUser: true
  });
  return true;
}

function callFunction(name, data) {
  if (!isCloudReady()) {
    return Promise.reject(new Error("云开发未启用"));
  }

  return wx.cloud.callFunction({
    name,
    data
  });
}

module.exports = {
  env,
  isCloudReady,
  initCloud,
  callFunction
};
