// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/connection");

// class Downvote extends Model {}

<<<<<<< HEAD
// Downvote.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "user",
//         key: "id",
//       },
//     },
//     book_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "book",
//         key: "id",
//       },
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "downvote",
//   }
// );
=======
Downvote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id"
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "book",
        key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "downvote"
  }
);
>>>>>>> 327be85235299a5cf07695308da687f35222ef57

// module.exports = Downvote;
