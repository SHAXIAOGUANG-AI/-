const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event) => {
  const applicationId = event.applicationId;
  const orderId = event.orderId;
  const applicantOpenid = event.applicantOpenid;

  if (!applicationId || !orderId || !applicantOpenid) {
    return { error: "missing required fields" };
  }

  await db.collection("applications").doc(applicationId).update({
    data: {
      status: "accepted",
      updatedAt: db.serverDate()
    }
  });

  await db.collection("orders").doc(orderId).update({
    data: {
      substituteOpenid: applicantOpenid,
      status: "matched",
      updatedAt: db.serverDate()
    }
  });

  return { applicationId, orderId, status: "matched" };
};
