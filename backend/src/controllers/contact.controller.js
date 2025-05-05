import Contact from "../models/contact.model.js";

export const getContacts = async (req, res) => {
  try {
    const senderId = req.user._id;

    const contacts = await Contact.find({
      $or: [
        {
          senderId: senderId,
        },
        {
          receiverId: senderId,
        },
      ],
    }).populate("senderId receiverId", "fullName email profilePic");
    res.status(200).json(contacts);
  } catch (error) {
    console.log("Error in getContacts controller:", error.message);
    res.status(500).json({ message: "Internal server error " });
  }
};

export const addContact = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // check if request already exists
    const existing = await Contact.findOne({ senderId, receiverId });
    if (existing) {
      return res.status(400).json({ message: "Contact request already sent." });
    }

    const newContact = new Contact({
      senderId,
      receiverId,
      status: "pending",
    });

    await newContact.save();

    res.status(201).json(newContact);
  } catch (error) {
    console.log("Error in addContact controller:", error.message);
    res.status(500).json({ message: "Internal server error " });
  }
};

export const updateContact = async (req, res) => {
  try {
    const senderId = req.user._id; // the person who accepts the request (initially received the request)
    const { id: receiverId, action } = req.params; // initially sent the request

    // throw malformed requests
    if (!["accept", "reject", "block"].includes(action)) {
      return res.status(400).json({ message: "Request is malformed" });
    }

    // get contact request
    const request = await Contact.findOne({
      senderId: receiverId,
      receiverId: senderId,
    });

    if (!request) return res.status(400).json({ message: "Request is not found" });

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Action no longer valid for this request" });
    }

    if (action === "accept") {
      request.status = "accepted";
      await request.save();
      return res.status(200).json({ message: "Contact request accepted." });
    }

    if (action === "reject") {
      await Contact.deleteOne({ _id: request._id });
      return res.status(200).json({ message: "Contact request rejected." });
    }

    if (action === "block") {
      request.status = "blocked";
      await request.save();
      return res.status(200).json({ message: "Contact blocked." });
    }
  } catch (error) {
    console.log("Error in updateContact controller:", error.message);
    res.status(500).json({ message: "Internal server error " });
  }
};

export const deleteContact = (req, res) => {
  try {
  } catch (error) {
    console.log("Error in deleteContact controller:", error.message);
    res.status(500).json({ message: "Internal server error " });
  }
};
