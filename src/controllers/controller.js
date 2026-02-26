import StoryContent from "../models/mongoModel.js";

export const content = async (req, res) => {
    try {
        const story = await StoryContent.find();
        res.status(200).json(story);
    } catch (error) {
        console.error(error);  
        res.status(500).json({ message: error.message });
    }
};