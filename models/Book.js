//Book extends Model

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Book model with a custom static method to handle voting
class Book extends Model {
  static upvote(body, models) {
    return models.Upvote.create({
      user_id: body.user_id,
      book_id: body.book_id,
    }).then(() => {
      return Book.findOne({
        where: {
          id: body.book_id,
        },
        attributes: [
          "id",
          "title",
          "created_at",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM upvote WHERE book.id = upvote.book_id)"
            ),
            "upvote_count",
          ],
        ],
        include: [
          {
            model: models.Review,
            attributes: [
              "id",
              "review_text",
              "book_id",
              "user_id",
              "created_at",
            ],
            include: {
              model: models.User,
              attributes: ["username"],
            },
          },
        ],
      });
    });
  }
}

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
    author: {
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

//**thinking through how Book model will change to account for an upvote/ downvote associated with each book */
//THIS WOULD BE AT BEGINNING OF MODEL BEFORE Book.init....

// class Book extends Model {
//   static upvote(body, models) {
//     return models.Upvote.create({
//       user_id: body.user_id,
//       book_id: body.book_id,
//     }).then(() => {
//       return Book.findOne({
//         where: {
//           id: body.book_id,
//         },
//         attributes: [
//           "id",
//           "title",
//           "created_at",
//           [
//             sequelize.literal(
//               "(SELECT COUNT(*) FROM upvote WHERE book.id = upvote.book_id)"
//             ),
//             "upvote_count",
//           ],
//         ],
//         include: [
//           {
//             model: models.Review,
//             attributes: [
//               "id",
//               "review_text",
//               "book_id",
//               "user_id",
//               "created_at",
//             ],
//             include: {
//               model: models.User,
//               attributes: ["username"],
//             }
//           }
//         ],
//       });
//     });
//   }
// }
