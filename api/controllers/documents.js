const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const {Document, Section, SubSection} = require('../models/documents')


// GraphQL schema
const schema = buildSchema(`
    type RandomDie{
        num: Int!
        roll(num: Int!):[Int]
    }
    type Query{
        getDie(num: Int!):RandomDie
    }

    input subSection{
        title: String!
        text: String!
    }
    input Section{
        title: String!
        text: String
        subSections: [subSection]
    }
    input Document{
        title: String!
        summary: String
        sections: [Section]
    }
    type Mutation{
        createDoc(input: Document!):String!
    }
`);
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
        let subSections = null
        if (section.subSections){
            subSections = section.subSections.map(subSec => new SubSection({
                _id: new mongoose.Types.ObjectId(),
                title: subSec.title,
                text: subSec.text
            }).save())
        }
        sections.push(new Section({
            _id: new mongoose.Types.ObjectId(),
            title: section.title,
            text: section.text,
            subSections: subSections
        }).save())
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
const root = {
    getDie: ({num}) => {
        return new RandomDie(num||7)
    },
    createDoc: createDocument
};

module.exports = {schema, root}