const mock = require("./data/mock");

App({
  globalData: {
    serviceRate: 8,
    orders: mock.orders,
    userProfile: mock.userProfile,
    workbenchStats: mock.workbenchStats
  }
});
