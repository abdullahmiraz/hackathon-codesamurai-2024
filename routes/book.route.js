const express = require("express");
const {
  createBook,
  getAllBooks,
  getABook,
  updateBookByID,
} = require("../controllers/book.controller");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getABook);
router.post("/", createBook);
router.put("/:id", updateBookByID);

module.exports = router;
