const BookInstance = require("../models/bookinstance");

// const asyncHandler = require("express-async-handler");

// exports.bookinstance_list = asyncHandler(async (req, res, next) => {
//   const allBookInstances = await BookInstance.find().populate("book").exec();

//   // res.render("bookinstance_list", {
//   //   title: "Book Instance List",
//   //   bookinstance_list: allBookInstances,
//   // });
//   res.json({
//     title: "Book Instance List",
//     bookinstance_list: allBookInstances,
//   });
// });

exports.bookinstance_list = (req, res, next) => {
  BookInstance.find()
    .populate("book")
    .exec()
    .then((allBookInstances) => {
      res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: allBookInstances,
      });
    });
};

exports.bookinstance_detail = async (req, res, next) => {
  try {
    const detail = await BookInstance.findById(req.params.id)
      .populate("book")
      .exec();

    if (detail == null) {
      // No results.
      const err = new Error("Book copy not found");
      err.status = 404;
      throw err;
    }

    res.render("bookinstance_detail", {
      title: "Book",
      bookinstance: detail,
    });
  } catch (e) {
    // No results.
    const err = new Error("Book copy not found");
    err.status = 404;
    next(err);
  }
};
