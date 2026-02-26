import express from "express";
import { content } from "../controllers/controller.js";
import StoryContent from "../models/mongoModel.js";

const router = express.Router();


// ✅ POST - Create Story (contentId auto generated)
router.post("/stories", async (req, res) => {
    try {
        const { title, titleBeng,contentEng,contentBeng, image } = req.body;

        if (!title || !titleBeng || !contentEng || !contentBeng|| !image) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newStory = await StoryContent.create({
            title,
            titleBeng,
            contentEng,
            contentBeng,
            image
        });

        res.status(201).json({
            success: true,
            message: "Story created successfully",
            data: newStory
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// ✅ GET - All Stories (Sorted by latest contentId)
router.get("/stories", async (req, res) => {
    try {
        const stories = await StoryContent.find().sort({ contentId: -1 });

        res.status(200).json({
            success: true,
            count: stories.length,
            data: stories
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


router.get("/stories/:contentId", async (req, res) => {
  try {
    const contentId = Number(req.params.contentId);

    if (isNaN(contentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contentId"
      });
    }

    const story = await StoryContent.findOne({ contentId });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found"
      });
    }

    res.status(200).json({
      success: true,
      data: story
    });

  } catch (error) {
    console.error("SERVER ERROR:", error); // 🔥 important
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});



// ✅ GET - Single Story by contentId
// router.get("/:contentId", async (req, res) => {
//     try {
//         const story = await StoryContent.findOne({
//             contentId: req.params.contentId
//         });

//         if (!story) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Story not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             data: story
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// });


export default router;