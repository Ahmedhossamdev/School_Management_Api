const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ClassroomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});


const Classroom = mongoose.model('Classroom', ClassroomSchema);
module.exports = Classroom;