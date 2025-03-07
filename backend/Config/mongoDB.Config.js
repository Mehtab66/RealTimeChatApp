const mongoose = require("mongoose");

const mongo = async () => {
  try {
    const connec = await mongoose.connect(
      "mongodb://localhost:27017/RealTimeChatApplication"
    );
    console.log(`MongoDB connected,${connec.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = mongo;
