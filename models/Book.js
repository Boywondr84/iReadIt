//Book extends Model

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// create our Book model
class Book extends Model{} 
        
// create fields/columns for Book model
Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "book",
  }
);

module.exports = Book;


// attributes: [
//     "id",
//     "title",
//     "user_id",
//     "created_at",
//   ],
//   include: [
//     {
//       model: Review,
//       attributes: [
//         "id",
//         "review_text",
//         "book_id",
//         "user_id",
//         "created_at",
//       ],
//       include: {
//         model: User,
//         attributes: ["username"],
//       },
//     },
//   ]
// };