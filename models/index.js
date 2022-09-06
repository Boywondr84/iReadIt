//this is the relationships among the tables...one to many etc..
const User = require("./User");
const Book = require("./Book");
const Review = require("./Review");
const Upvote = require("./Upvote");
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
<<<<<<< HEAD
=======
  onDelete: "SET NULL"
>>>>>>> 327be85235299a5cf07695308da687f35222ef57
});

User.hasMany(Book, {
  foreignKey: "user_id",
<<<<<<< HEAD
=======
  onDelete: "SET NULL"
>>>>>>> 327be85235299a5cf07695308da687f35222ef57
});

Book.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL"
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
