import mongoose, { model } from "mongoose";
import Counter from "./counterModel.js";

const storySchema = new mongoose.Schema({
    contentId: {
        type: Number,
        unique: true
    },
    title:[ {
        type: String,
        required: true,
    }],
    titleBeng:[
        {
            type:String,
            required:true,
        }
    ],
    contentEng: [{
        type: String,
        required: true,
    }],
    contentBeng:[{
        type:String,
        required : true
    }],
    image: [{
        type: String,
        required: true,
    }]
});

storySchema.pre("save", async function () {

    if (!this.isNew) return;

    const counter = await Counter.findOneAndUpdate(
        { name: "storyContentId" },
        { $inc: { value: 1 } },
        {
            returnDocument: "after",
            upsert: true
        }
    );

    this.contentId = counter.value;
});

const StoryContent = model("StoryContent", storySchema);

export default StoryContent;