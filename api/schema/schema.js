const { buildSchema } = require('graphql')

// GraphQL schema
const schema = buildSchema(`
    type RandomDie{
        num: Int!
        roll(num: Int!):[Int]
    }
    
    type DocSubSection{
        id: ID!
        title: String!
    }
    type DocSection{
        id: ID!
        title: String!
        subSections: [DocSubSection!]
    }

    type DocContent{
        id: ID
        title: String!
        summary: String!
        sections: [DocSection!]
    }

    type Documents{
        id: ID
        title: String!
        summary: String!
    }

    type Query{
        getDie(num: Int!):RandomDie
        getDocContent(docID: ID!): DocContent
        getDocuments:[Documents]!
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


module.exports = {schema}