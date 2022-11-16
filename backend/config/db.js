const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      //  `mongodb+srv://Viktoras:${process.env.MONGO_PASS}@merncluster.wmbzp6l.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
      `mongodb+srv://Viktoras:8JJZmfRLFTOuPrlw@merncluster.wmbzp6l.mongodb.net/MernApp?retryWrites=true&w=majority`
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectDB;
