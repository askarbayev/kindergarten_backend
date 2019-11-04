const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const subSectionSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String},
    text: {type: String}
})

const sectionScheme = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String},
    text: {type: String},
    subSections: [{ type: Schema.Types.ObjectId, ref: 'SubSection' }]   
})

const docScheme = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required:true},
    text: {type: String},
    summary: {type: String},
    date: {type: Date, required: true},
    sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
})




const Document = mongoose.model('Document', docScheme)
const Section = mongoose.model('Section', sectionScheme)
const SubSection = mongoose.model('SubSection', subSectionSchema)

module.exports = {Document, Section, SubSection}