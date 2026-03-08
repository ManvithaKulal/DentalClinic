const router = require("express").Router();
const contactController = require("../controllers/contactController");

router.post("/send", contactController.sendContactMail);

module.exports = router;
