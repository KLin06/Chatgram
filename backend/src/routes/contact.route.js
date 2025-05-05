import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addContact, getContacts, updateContact } from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/contacts", protectRoute, getContacts);
router.post("/request/:id", protectRoute, addContact);
router.put("/:action/:id", protectRoute, updateContact)

export default router;