import mongoose from "mongoose";

const DBConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DataBase Is Connected`);
  } catch (error) {
    console.log(`DataBase is Not Connected Because ${error}`);
  }
};

export default DBConnect;
