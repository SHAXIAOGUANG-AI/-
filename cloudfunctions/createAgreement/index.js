const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event) => {
  const agreement = {
    orderId: event.orderId,
    workerOpenid: event.workerOpenid,
    substituteOpenid: event.substituteOpenid,
    companyId: event.companyId || "",
    status: "draft",
    fileId: "",
    termsVersion: "v1",
    createdAt: db.serverDate(),
    updatedAt: db.serverDate()
  };

  if (!agreement.orderId || !agreement.workerOpenid || !agreement.substituteOpenid) {
    return { error: "missing required fields" };
  }

  const res = await db.collection("agreements").add({ data: agreement });
  return { agreement: { id: res._id, ...agreement } };
};
