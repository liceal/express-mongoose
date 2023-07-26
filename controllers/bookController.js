// /controllers/bookController.js

var Book = require("../models/book");
var Author = require("../models/author");
var Genre = require("../models/genre");
var BookInstance = require("../models/bookinstance");

const asyncHandler = require("express-async-handler");
exports.index = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts (in parallel)
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({ status: "Available" }).exec(),
    Author.countDocuments({}).exec(),
    Author.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Local Library Home",
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstances,
    author_count: numAuthors,
    genre_count: numGenres,
  });
});

exports.book_create_get = (req, res) => {
  res.send("未实现：请求新的藏书");
};

exports.book_create_post = (req, res) => {
  res.send("未实现：添加新的藏书");
};

exports.book_delete_get = (req, res) => {
  res.send(`未实现：删除藏书，ID：${req.params.id}`);
};

exports.book_delete_post = (req, res) => {
  res.send("未实现：删除藏书");
};

exports.book_update_get = (req, res) => {
  res.send(`未实现：更新藏书，ID：${req.params.id}`);
};

exports.book_update_post = (req, res) => {
  res.send("未实现：更新藏书");
};

exports.book_detail = asyncHandler(async (req, res) => {
  // res.send(`未实现：藏书详情，ID：${req.params.id}`);
  const [book, book_instance] = await Promise.all([
    Book.findById(req.params.id).populate("author").populate("genre").exec(),
    BookInstance.find({ book: req.params.id }).exec(),
  ]);
  if (!book) {
    var err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }
  res.render("book_detail", {
    title: "Title",
    book: book,
    book_instances: book_instance,
  });
});

// Display list of all books.
exports.book_list = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec();

  res.render("book_list", { title: "Book List", book_list: allBooks });
});
