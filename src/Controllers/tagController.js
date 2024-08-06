const Tag = require("../Models/tagModel");

//  controller for adding a category
const addTag = async (req, res) => {
  const { name, time } = req.body;
  if (!name || !time) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  //  check if category already exists
  try {
    const tagExists = await Tag.findOne({ name });
    if (tagExists) {
      return res.status(400).json({ msg: "Tag already exists" });
    }
    const tag = new Tag({
      name,
      time,
    });
    await tag.save();
    return res
      .status(201)
      .json({ msg: "Tag added successfully", tag });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller for getting all categories

const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    return res
      .status(200)
      .json({ msg: "category fetched successfully", tags });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


// controller for getting a single category

const getTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) {
        return res.status(404).json({ msg: "Tag not found" });
        }
        return res.status(200).json({ msg: "Tag fetched successfully", tag });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }


// controller for updating a category

const updateTag= async (req, res) => {
    const { name, time } = req.body;
    if (!name || !time) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const tag = await Tag.findByIdAndUpdate(
        req.params.id,
        { name, time },
        { new: true }
        );
        if (!tag) {
        return res.status(404).json({ msg: "tag not found" });
        }
        return res
        .status(200)
        .json({ msg: "tag updated successfully", tag });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }

// controller for deleting a category

const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndDelete(req.params.id);
        if (!tag) {
        return res.status(404).json({ msg: "Tag not found" });
        }
        return res.status(200).json({ msg: "Tag deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }

module.exports = { addTag, getTags, getTag, updateTag, deleteTag };