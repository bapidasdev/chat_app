import mongoose from "mongoose"

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("DB_CONNECTED");
    }).catch((error) => {
        console.log(error);

    })
}

export default connectDB