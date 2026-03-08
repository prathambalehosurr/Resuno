const mongoose = require('mongoose');


/**
 * - job description schema : String
 * - resume text : String
 * - Self descreiption : String
 * 
 * - matchScore : Number
 * 
 * - Technical questions :
 *               [{
 *                 question : "",
 *                 intention : "" 
 *                 answer : "",
 *               }]
 * - Behavioral questions : 
 *                    [{
 * *                    question : "",
 *                      intention : "" 
 *                      answer : "",
 *                   }]
 * - Skill gaps : [{
 *                   skill : "",
 *                   severity : "",
 *                   type : String,
 *                   enum :["low", "medium", "high"],
 *                 }]
 * - preperation plan : [{
 *                      day : Number,
 *                      focus: String,
 *                      tasks : [String],
 * 
 * }]
 */


const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical Question is Required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is Required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is Required"]
    }
}, {
    _id: false
});

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioral Question is Required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is Required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is Required"]
    }
}, {
    _id: false
});


const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is Required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is Required"],
    },
}, {
    _id: false
});


const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is Required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is Required"]
    },
    tasks: {
        type: [String],
        required: [true, "Tasks are Required"]
    }
});



const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    title: {
        type: String,
        require: [ true, "Job title required"]
    }
}, {
    timestamps: true,
})


const interviewReportModel = mongoose.model('InterviewReport', interviewReportSchema);



module.exports = interviewReportModel;