const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: { type:String, required: true, unique:true },
    password:{type: String, required: true},
    pic:{type:String,required: true, default: "https://images.unsplash.com/photo-1725798451557-fc60db3eb6a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGdyZWVufGVufDB8fDB8fHww"}
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema)

module.exports = User;