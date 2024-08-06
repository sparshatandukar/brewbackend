const Recipe = require("../Models/recipeModel");

//  controller for adding a category
const addRecipe = async (req, res) => {
  const { recipeName, description, prep_time, difficulty  } = req.body;
  if (!recipeName || !description || !prep_time || !difficulty) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  //  check if category already exists
  try {
    const recipeExists = await Recipe.findOne({ recipeName });
    if (recipeExists) {
      return res.status(400).json({ msg: "Recipe already exists" });
    }
    const recipe = new Recipe({
      recipeName,
      description,
      prep_time,
      difficulty
    });
    await recipe.save();
    return res
      .status(201)
      .json({ msg: "Recipe added successfully", recipe });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller for getting all categories

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    return res
      .status(200)
      .json({ msg: "recipe fetched successfully", recipes });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


// controller for getting a single category

const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
        return res.status(404).json({ msg: "Recipe not found" });
        }
        return res.status(200).json({ msg: "Recipe fetched successfully", recipe });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }


// controller for updating a category

const updateRecipe = async (req, res) => {
    const {recipeName, description, prep_time, difficulty} = req.body;
    if (!recipeName || !description || !prep_time || !difficulty) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const recipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        {  recipeName,
            description,
            prep_time,
            difficulty},
        { new: true }
        );
        if (!recipe) {
        return res.status(404).json({ msg: "Recipe not found" });
        }
        return res
        .status(200)
        .json({ msg: "Recipe updated successfully", recipe });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }

// controller for deleting a category

const deleteRecipe= async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
        return res.status(404).json({ msg: "Recipe not found" });
        }
        return res.status(200).json({ msg: "Recipe deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }

module.exports = { addRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe };