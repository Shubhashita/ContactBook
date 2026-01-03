const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/contact", auth, contactController.createContact);
router.get("/mycontacts", auth, contactController.getMyContacts);
router.put("/contact", auth, contactController.updateContact);
router.delete("/delete/:id", auth, contactController.deleteContact);
router.get("/contact/:id", auth, contactController.getContact);

module.exports = router;
