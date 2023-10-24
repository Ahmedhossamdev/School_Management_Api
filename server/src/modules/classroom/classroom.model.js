const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const classroomSchema = new Schema({
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

// classroomSchema.pre(/^find/ , function(next) {
//     this.populate({
//         path: 'school',
//     });
//     next();
// });
//

classroomSchema.pre('save', function (next) {
    this.name = this.name.toLowerCase();
    next();
});


const Classroom = mongoose.model('Classroom', classroomSchema);
module.exports = Classroom;