const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, maxLength: 255, required: true },
        description: { type: String, required: true },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, maxLength: 255, required: true },
        level: { type: String, required: true },
        slug: { type: String, slug: 'name' },
        deletedAt: {},
    },
    {
        timestamps: true,
    },
);

// Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
