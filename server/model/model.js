const mongoose = require("mongoose");

//creating schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },

    // firstName: {
    //     type: String,
    //     required:true
    // },

    // lastName: {
    //     type: String,
    //     required:true
    // },


    email: {
        type: String,
        required: true,
        unique:true
    },

    gender: {
        type: String,
    },

    status: {
        type: String,
    },

    location:{
        type: String
    }
})

// ameliaodoh@starnet.com


//creating model
const userDB = mongoose.model("userDB", userSchema)


module.exports = userDB