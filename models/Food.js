const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema(
  {
    orderid: {
      type: Number,
      required:true,
    },
    foodname: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },

    itemorderd: {
      type: String,
      required: true,
    },
    itemdelivery: {
      type: String,
      required: true,
    },
    //"type": "grunt",
    //  "last_used": {"$date":{"$numberLong":"1602720972129"}},
    //"created_at":{"$date":{"$numberLong":"1602720972129"}},
    nearme: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
