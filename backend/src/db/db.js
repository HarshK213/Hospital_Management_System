import mongoose from "mongoose";

const DBConnect = async () => {
  const DB_NAME = "Hospital_DB";
  try {
    console.log("HI");
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `MONGO DB Connection established \n DB Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`MongoDB Connection Error : `, error);
    process.exit(1);
  }
};

export default DBConnect;
