import mongoose from "mongoose";

const DBConnect = async () => {
  try {
    console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);
    const connect = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`DataBase Is Connected ${connect.connection.host}`);
  } catch (error) {
    console.log(`DataBase is Not Connected Because ${error}`);
  }
};

export default DBConnect;
