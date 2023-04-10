const mongoose = require("mongoose");
const photoSchema = new mongoose.Schema(
{
  photo: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  }
});
mongoose.model("Photo", photoSchema);
