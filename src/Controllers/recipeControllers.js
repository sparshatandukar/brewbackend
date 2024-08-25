const Recipe = require("../Models/recipeModel");
const domain = "http://localhost:8000";

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  res.status(500).json({ msg: error.message });
};

// Create a new recipe
const addRecipe = async (req, res) => {
  try {
    const { categoryId, recipeName, description, prep_time, difficulty, direction } = req.body;
    let recipeData = {
      categoryId,
      recipeName,
      description,
      prep_time,
      difficulty,
      direction
    };

    if (req.file) {
      const recipeImage = `${domain}/uploads/recipes/${req.file.filename}`;
      recipeData.recipeImage = recipeImage;
    }

    const recipeExists = await Recipe.findOne({ recipeName });
    if (recipeExists) {
      return res.status(400).json({ msg: "Recipe already exists" });
    }

    const recipe = new Recipe(recipeData);
    await recipe.save();

    res.status(201).json({
      msg: "Recipe added successfully",
      recipe: recipe,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  try {
    const { recipeName, description, prep_time, difficulty,direction } = req.body;
    let updateData = {
      recipeName,
      description,
      prep_time,
      difficulty,
      direction
    };

    if (req.file) {
      const recipeImage = `${domain}/uploads/recipes/${req.file.filename}`;
      updateData.recipeImage = recipeImage;
    }

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    res.status(200).json({
      msg: "Recipe updated successfully",
      recipe: recipe,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('categoryId');
    res.status(200).json({ msg: "Recipes fetched successfully", recipes });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};


// Get a single recipe by ID
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    res.status(200).json({ msg: "Recipe fetched successfully", recipe });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    res.status(200).json({ msg: "Recipe deleted successfully", success: true });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete all recipes
const deleteAllRecipes = async (req, res) => {
  try {
    await Recipe.deleteMany();
    res.status(200).json({ msg: "All recipes deleted successfully" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  addRecipe,
  updateRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  deleteAllRecipes,
};
