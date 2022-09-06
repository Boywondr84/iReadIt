//this is the relationships among the tables...one to many etc..
const User = require("./User");
const Book = require("./Book");
const Review = require("./Review");
// const Upvote = require("./Upvote");
// const Downvote = require("./Downvote");

Review.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL"
});

User.hasMany(Review, {
  foreignKey: "user_id",
  onDelete: "SET NULL"
});

Review.belongsTo(Book, {
  foreignKey: "book_id",
  onDelete: "SET NULL"
});

Book.hasMany(Review, {
  foreignKey: "book_id",
  onDelete: "SET NULL"
});

User.hasMany(Book, {
  foreignKey: "user_id",
  onDelete: "SET NULL"
});

Book.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL"
});

module.exports = { User, Book, Review };
