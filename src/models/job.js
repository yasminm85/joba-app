import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true
        },
        jobTitle: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String,
            default: 'Remote/Hybrid'
        },
        description: {
            type: String
        },
        qualifications: {
            type: [String],
            default: []
        },
        salary: {
            type: String,
            default: 'Not disclosed'
        },
        contact: {
            type: String
        },
        status: {
            type: String,
            enum: ['Applied', 'Technical Test', 'Interview HR', 'Interview User', 'Offering', 'Accepted', 'Rejected'],
            default: 'Applied'
        },
        interviewDate: {
            type: String,
            default: ''
        },
        interviewTime: {
            type: String,
            default: ''
        },
        interviewDuration: {
            type: String,
            default: 60
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.models.Job || mongoose.model('Job', JobSchema);