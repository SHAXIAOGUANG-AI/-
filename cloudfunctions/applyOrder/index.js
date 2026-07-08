const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event) => {
  const wxContext = cloud.getWXContext();
  const application = {
    orderId: event.orderId,
    applicantOpenid: wxContext.OPENID,
    message: event.message || "",
    status: "pending",
    createdAt: db.serverDate(),
    updatedAt: db.serverDate()
  };
  const res = await db.collection("applications").add({ data: application });
  return { application: { id: res._id, ...application } };
};
