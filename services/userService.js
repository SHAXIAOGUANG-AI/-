const { callFunction, isCloudReady } = require("./cloud");
const mock = require("../data/mock");

function login() {
  if (!isCloudReady()) {
    return Promise.resolve({
      openid: "local-demo-openid",
      profile: mock.userProfile
    });
  }

  return callFunction("login", {}).then((res) => res.result);
}

module.exports = {
  login
};
