const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    storedCourse(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) => {
                res.render('me/stored-courses', { courses });
            })
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourse(req, res, next) {
        Course.findDeleted({})
            .lean()
            .then((courses) => {
                res.render('me/trash-courses', { courses });
            })
            .catch(next);
    }
}

module.exports = new MeController();
