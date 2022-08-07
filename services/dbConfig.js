const mongoose = require("mongoose");
const dbconnect = async () =>  {
try
{
await mongoose.connect("mongodb+srv://Riya_Khadka:15dZiZ5M5kwXxOn4@cluster0.usqifyx.mongodb.net/FOODORDERING?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser:true,
});
console.log("MongoDB connected successfully");
}
catch (error)
{
    console.log(`Error in connecting mongoDB $(error)`);
}
};

module.exports= dbconnect;