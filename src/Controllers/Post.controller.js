const express = require("express");
const router = express.Router();
const Post = require("../Models/Post.model");
const multer = require("multer");
const upload = multer();

router.get("/", async (req, res) => {
  let { sort, page, limit, keyword, tag, ...rest } = req.query;
  keyword = req.query?.keyword && req.query?.keyword.trim();
  tag = req.query?.tag && req.query?.tag.trim();

  // Check for invalid parameters
  if (Object.keys(rest).length > 0) {
    return res.status(400).json({ error: "Invalid query parameters provided" });
  }

  try {
    // Pagination
    const currentPage = parseInt(page, 10) || 1;
    const perPage = parseInt(limit, 10) || 10;
    const skip = (currentPage - 1) * perPage;

    // Filtering
    const filter = {};

    // Keyword filter (search in title or description)
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // Tag filter
    if (tag) {
      filter["tags.name"] = tag; // Matches documents where `tags` array contains an object with a `name` field that matches the `tag`
    }

    // Sorting
    const sortOption = {};
    if (sort) {
      const [field, order] = sort.split(":"); // Example: "createdAt:asc"
      sortOption[field] = order === "desc" ? -1 : 1;
    }

    // Query the database
    const posts = await Post.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    // Total count for pagination
    const totalPosts = await Post.countDocuments(filter);

    res.status(200).json({
      data: posts,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalPosts / perPage),
        totalPosts,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const { title, description, author, createdAt, tags } = JSON.parse(
      req.body.data
    );

    const base64Image = req.file.buffer.toString("base64");

    const post = await Post.create({
      title,
      image: base64Image,
      description,
      author,
      tags,
      createdAt,
    });

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
