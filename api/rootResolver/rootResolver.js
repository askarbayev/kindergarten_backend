const mongoose = require('mongoose')
const {Document, Section, SubSection} = require('../models/documents')


// Root resolver

class RandomDie{
    constructor(num){
        this.num = num
    }

    roll({num}){
        return [3, 5, 6]
    }
}

const createDocument = ({input})=>{
    console.log('Input1', input)
    let sections = []
    for (let section of input.sections){
        console.log('Section INSERT', section)
        let subSections = []
        if (section.subSections){
            section.subSections.forEach(subSec => {
                console.log('SUB SEC', subSec)
                const subSection = new SubSection({
                    _id: new mongoose.Types.ObjectId(),
                    title: subSec.title,
                    text: subSec.text
                })
                subSection.save(
                    subSections.push(subSection._id)
                )
        })
        }
        const sectionObj = new Section({
            _id: new mongoose.Types.ObjectId(),
            title: section.title,
            text: section.text,
            subSections: subSections
        })
        sectionObj.save(
            sections.push(sectionObj._id)
        )
        
    }
    const document = new Document({
        _id: new mongoose.Types.ObjectId(),
        title: input.title,
        summary: input.summary,
        date: new Date(),
        sections: sections
    })
    document.save()
    .then(_=>{
        return "Mutated"
    })
    .catch(_ => {
        return "failed to save"
    })

    return "Mutated2"
    
}

const getDocContent = async ({docID})=>{
    try{
        const document = await Document.findById(docID).populate({
            path:'sections',
            populate:{
                path:'subSections'
            }
        })
        
        return document
    }
    catch(e){
        return 'Failed to Reach the endpoint!'
    }
    
}

const root = {
    getDie: ({num}) => {
        return new RandomDie(num||7)
    },
    createDoc: createDocument,
    getDocContent: getDocContent
};

module.exports = {root}