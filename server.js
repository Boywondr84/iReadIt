const path = require('path');
const express = require('express');
const session = require('express-session');
// const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3005;

const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Secret super secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// const routes = require('./controller');

// app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening on Port' + `${PORT}` ));
});