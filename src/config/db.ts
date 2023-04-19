import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.DATABASE_URL!, {});
    console.log(`Connection to database successful ${con.connection.host}`);
  } catch (error) {
    console.log(`Connection to database failed ${error}`);
    process.exit();
  }
};
