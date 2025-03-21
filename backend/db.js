const mongoose =require("mongoose");
mongoose.set('strictQuery',false);
const dbConnect=async ()=>{
    try {
        console.log(process.env.DB_URI)
        const conn=await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
        console.log(`Database Connected ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}
module.exports=dbConnect;