const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    storedCourse(req, res, next) {
        let courseQuery = Course.find().lean();

        Promise.all([courseQuery.sortable(req), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    courses,
                    deletedCount,
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/courses
    async trashCourse(req, res, next) {
        try {
            const courses = await Course.findDeleted().lean();
            res.render('me/trash-courses', { courses });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MeController();
