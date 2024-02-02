const mongoose = require("mongoose");
const Book = require("../models/book.model");

// create a book
const createBook = async (req, res) => {
  try {
    const { id, title, author, genre, price } = req.body;

    const book = await Book.create({
      id,
      title,
      author,
      genre,
      price,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all books book
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: 1 });

    res.status(200).json({
      books: books.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        price: book.price,
      })),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update book by id

const updateBookByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, price } = req.body;

    const updatedBook = await Book.findOneAndUpdate(
      { id: id },
      { $set: { title, author, genre, price } },
      { new: true }
    );

    if (!updatedBook) {
      throw new Error(`Book with id: ${id} was not found`);
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: error.message });
  }
};

// get a book

const getABook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({ id: id });

    if (!book) {
      throw new Error(`Book with id: ${id} was not found.`);
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  updateBookByID,
  getABook,
};
