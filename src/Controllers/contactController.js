const Contact = require("../Models/contactModel");

//  controller for adding a contact
const addContact = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  //  check if category already exists
  try {
    const contactExists = await Contact.findOne({ name });
    if (contactExists) {
      return res.status(400).json({ msg: "contact already exists" });
    }
    const contact = new Contact({
      name,
      email,
      message
    });
    await contact.save();
    return res
      .status(201)
      .json({ msg: "contact added successfully", contact });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller for getting all contact

const getContacts = async (req, res) => {
  try {
    const contact = await Contact.find();
    return res
      .status(200)
      .json({ msg: "contact fetched successfully", contact });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


// controller for getting a single contact

const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
        return res.status(404).json({ msg: "contact not found" });
        }
        return res.status(200).json({ msg: "contact fetched successfully", contact });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }


// controller for updating a contact

const updateContact = async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { name, email, message },
        { new: true }
        );
        if (!contact) {
        return res.status(404).json({ msg: "contact not found" });
        }
        return res
        .status(200)
        .json({ msg: "contact updated successfully", contact });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }

// controller for deleting a contact

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
        return res.status(404).json({ msg: "contact not found" });
        }
        return res.status(200).json({ msg: "contact deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }

module.exports = { addContact, getContacts, getContact, updateContact, deleteContact };