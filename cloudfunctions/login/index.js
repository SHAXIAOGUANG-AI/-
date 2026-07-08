const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async () => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const users = db.collection("users");
  const existing = await users.doc(openid).get().catch(() => null);

  if (!existing || !existing.data) {
    const profile = {
      role: "worker",
      name: "微信用户",
      verifyStatus: "pending",
      phoneStatus: "unbound",
      score: 80,
      createdAt: db.serverDate(),
      updatedAt: db.serverDate()
    };
    await users.doc(openid).set({ data: profile });
    return { openid, profile: { _id: openid, ...profile } };
  }

  return { openid, profile: existing.data };
};
