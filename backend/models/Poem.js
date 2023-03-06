const mongoose = require("mongoose")

const PoemSchema = mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    author_username:{
        type: String
    },
    title:{
        type: String
    },
    text:{
        type: String,
        required: true
    },
    visibility:{
        type: String,
        default: "private"
    },
},
{
    timestamps: true
})

module.exports = mongoose.model("Poem",PoemSchema)