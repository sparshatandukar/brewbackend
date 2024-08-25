const Ingredient = require("../Models/ingredientModel");

//  controller for adding a category
const addIngredient= async (req, res) => {
  const {recipeId, ingredientName,quantity} = req.body;
  if (!ingredientName || !quantity) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  //  check if category already exists
  try {
    // const ingredientExists = await Ingredient.findOne({ ingredientName });
    // if (ingredientExists) {
    //   return res.status(400).json({ msg: "Ingredient already exists" });
    // }
    const ingredient = new Ingredient({
      recipeId,
      ingredientName,
      quantity
    });
    await ingredient.save();
    return res
      .status(201)
      .json({ msg: "ingredient added successfully", ingredient });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller for getting all categories

const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    return res
      .status(200)
      .json({ msg: "ingredient fetched successfully", ingredients });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


// controller for getting a single category

const getIngredient = async (req, res) => {
  try {
    const recipeId = req.params.id; // Extract recipeId from request parameters

    // Find ingredients with the given recipeId
    const ingredients = await Ingredient.find({ recipeId: recipeId });

    if (ingredients.length === 0) {
      return res.status(404).json({ msg: "No ingredients found for this recipe" });
    }

    return res.status(200).json({
      msg: "Ingredients fetched successfully",
      ingredients,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


// controller for updating a category

const updateIngredient = async (req, res) => {
    const {ingredientName,quantity} = req.body;
    if (!ingredientName || !quantity) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const ingredient = await Ingredient.findByIdAndUpdate(
        req.params.id,
        {  ingredientName,
            quantity},
        { new: true }
        );
        if (!ingredient) {
        return res.status(404).json({ msg: "ingredient not found" });
        }
        return res
        .status(200)
        .json({ msg: "ingredient updated successfully", ingredient });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }

// controller for deleting a category

const deleteIngredient= async (req, res) => {
    try {
        const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
        if (!ingredient) {
        return res.status(404).json({ msg: "ingredient not found" });
        }
        return res.status(200).json({ msg: "ingredient deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }

module.exports = { addIngredient, getIngredients, getIngredient, updateIngredient, deleteIngredient };