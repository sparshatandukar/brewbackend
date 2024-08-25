const Rating = require("../Models/ratingModel");

//  controller for adding a rating
const addRating = async (req, res) => {
  const { ratings} = req.body;
  if (!ratings) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  //  check if category already exists
  try {
    const ratingExists = await Rating.findOne({ ratings });
    if (ratingExists) {
      return res.status(400).json({ msg: "rating already exists" });
    }
    const rating = new Rating({
      ratings,
      description
    });
    await rating.save();
    return res
      .status(201)
      .json({ msg: "rating added successfully", rating });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller for getting all rating

const getRatings = async (req, res) => {
  try {
    const rating = await Rating.find();
    return res
      .status(200)
      .json({ msg: "rating fetched successfully", rating });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


// controller for getting a single rating

const getRating = async (req, res) => {
    try {
        const rating = await Rating.findById(req.params.id);
        if (!rating) {
        return res.status(404).json({ msg: "rating not found" });
        }
        return res.status(200).json({ msg: "rating fetched successfully", rating });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }


// controller for updating a rating

const updateRating = async (req, res) => {
    const { ratings} = req.body;
    if (!ratings) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const rating = await Rating.findByIdAndUpdate(
        req.params.id,
        { ratings, description},
        { new: true }
        );
        if (!rating) {
        return res.status(404).json({ msg: "rating not found" });
        }
        return res
        .status(200)
        .json({ msg: "rating updated successfully", rating });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }

// controller for deleting a rating

const deleteRating = async (req, res) => {
    try {
        const rating = await Rating.findByIdAndDelete(req.params.id);
        if (!rating) {
        return res.status(404).json({ msg: "rating not found" });
        }
        return res.status(200).json({ msg: "rating deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }

module.exports = { addRating, getRatings, getRating, updateRating, deleteRating };