const Category = require('../models/Category');

const addCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({ message: 'Category added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editCategory = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const category = await Category.findByIdAndUpdate(id, updates, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addCategory, editCategory, deleteCategory, listCategories };
