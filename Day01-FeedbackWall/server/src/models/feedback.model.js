import mongoose, { model } from "mongoose";

const feedbackScehma = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    text:{
         type:String,
        required:true,
        trim:true,
    },
},{timestamps:true})

export const Feedback=new mongoose.model("Feedback",feedbackScehma);
