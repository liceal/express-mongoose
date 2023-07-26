const Genre = require("../models/genre");

var Book = require("../models/book");
const asyncHandler = require("express-async-handler");
var mongoose = require("mongoose");

exports.genre_list = (req, res, next) => {
  Genre.find()
    .sort({ name: "asc" })
    .exec()
    .then((genre_list) => {
      res.render("genre_list", {
        title: "Genre List",
        genre_list: genre_list,
      });
    });
};

exports.genre_detail = asyncHandler(async (req, res, next) => {
  try {
    const [genre, genre_books] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Book.find({ genre: req.params.id }).exec(),
    ]);

    if (!genre) {
      var err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }

    res.render("genre_detail", {
      title: "Genre Detail",
      genre: genre,
      genre_books: genre_books,
    });
  } catch (e) {
    var err = new Error(e);
    err.status = 404;
    return next(err);
  }
});
