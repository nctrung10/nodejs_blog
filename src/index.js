const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const morgan = require('morgan');
const app = express();
const port = 3000;

const sortMiddleware = require('./app/middlewares/sortMiddleware');

const route = require('./routes');
const db = require('./config/db');

// Connect to database
db.connect();

// Use extensions
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(sortMiddleware);

// HTTP logger
// app.use(morgan('short'))

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.col ? sort.type : 'default';

                const icons = {
                    default: 'fa-sort',
                    asc: 'fa-arrow-down-short-wide',
                    desc: 'fa-arrow-down-wide-short',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&col=${field}&type=${type}">
                    <i class="fa-solid ${icon}"></i>
                </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

//
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
