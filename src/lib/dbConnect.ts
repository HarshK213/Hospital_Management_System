import mongoose from "mongoose";

type ConnectionObj = {
  isConnected?: number;
};

const connection: ConnectionObj = {};

export async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already have a DB Connection");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connection failed : ", error);
    process.exit(1);
  }
}
