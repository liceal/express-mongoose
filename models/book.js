const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = mongoose.Schema({
  title: { type: String, required: true },
  // ref 对其他模型的引用 例如下面BookSchema.model("Book", BookSchema); 这个Book的命名
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

// 虚拟属性'url'：藏书 URL
BookSchema.virtual("url").get(function () {
  return "/catalog/book/" + this._id;
});

// 导出 Book 模块
module.exports = mongoose.model("Book", BookSchema);
