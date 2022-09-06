//this is the relationships among the tables...one to many etc..
const User = require("./User");
const Book = require("./Book");
const Review = require("./Review");
const Upvote = require("./Upvote");
// const Downvote = require("./Downvote");

Review.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.hasMany(Review, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Review.belongsTo(Book, {
  foreignKey: "book_id",
  onDelete: "SET NULL",
});

Book.hasMany(Review, {
  foreignKey: "book_id",
});

User.hasMany(Book, {
  foreignKey: "user_id",
});

Book.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.belongsToMany(Book, {
  through: Upvote,
  as: "voted_books",
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Book.belongsToMany(User, {
  through: Upvote,
  as: "voted_books",
  foreignKey: "book_id",
  onDelete: "SET NULL",
});

Upvote.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Upvote.belongsTo(Book, {
  foreignKey: "book_id",
  onDelete: "SET NULL",
});

User.hasMany(Upvote, {
  foreignKey: "user_id",
});

Book.hasMany(Upvote, {
  foreignKey: "book_id",
});

module.exports = { User, Book, Review, Upvote };
