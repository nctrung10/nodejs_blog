const Course = require('../models/Course');

class SiteController {
    // [GET] /home
    index(req, res) {
        Course.find({}, function (err, courses) {
            if (!err) {
                res.json(courses);
            } else {
                res.status(400).json({ err: 'Error' });
            }
        });

        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
