const path = require("path");
// const express = npm irequire("express"); 
const session = require("express-session");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const routes = require("./controller");

const app = express();
const PORT = process.env.PORT || 3005;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const sequelize = require("./config/connection");
const sequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Secret super secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize,
  }),
};

// app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log("Now listening on Port" + `${PORT}`));
});
