const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const DB = require('./driver');
// let db = new DB();

class Subscriber {
	constructor(email, name) {
		this.email = email;
		this.name = name;
	}
}


// The root provides a resolver function for each API endpoint
var root = {
  getSubscriber: (email) => {

  },
  createSubscriber: ({email, name}) => {
		// console.log(DB)
		return DB.insertOne()
  },
};

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
	type Subscriber {
		email: String!
		name: String
	}
  type Query {
    getSubscriber(email: String!): Subscriber
  }
  type Mutation {
		createSubscriber(email: String!, name: String): Subscriber
  }
`);

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
