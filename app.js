const mock = require("./data/mock");
const { initCloud, env } = require("./services/cloud");

App({
  onLaunch() {
    initCloud();
  },

  globalData: {
    serviceRate: env.serviceFeeRate,
    orders: mock.orders,
    userProfile: mock.userProfile,
    workbenchStats: mock.workbenchStats
  }
});
