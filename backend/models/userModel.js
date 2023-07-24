const mongoose = require('mongoose');



const problemSchema = mongoose.Schema({
    year: { type: Number },
    version: { type: Number },
    problem: { type: Number }
})
const answersSchema = mongoose.Schema({
    answer: { type: String }
})
const similarSchema = mongoose.Schema({
    similar: { type: [String] }
})
const testSchema = mongoose.Schema({
    problems: {
        type: [problemSchema]
    },
    answers: {
        type: [answersSchema]
    },
    similars: {
        type: [similarSchema]
    }
})

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    test: { type: [testSchema] }
})

module.exports = mongoose.model('userTests', userSchema);