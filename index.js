const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hirdbluebird:********@cluster0-3nyyj.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let connection;
client.connect(err => {
	if(!err) console.log(`DB connection established`)
	collection = client.db("hackernoon-subscribers").collection("subscribers");
})

class Subscriber {
	constructor(email, name) {
		this.email = email;
		this.name = name;
	}
}

// The root provides a resolver function for each API endpoint
var root = {
  getSubscriber: async (email) => {
		const data = await collection.findOne(email)
		if (data) return new Subscriber(data.email, data.name);
  },
  createSubscriber: async ({email, name}) => {
		const data = await collection.insertOne({email, name})
			.then(result => {
					console.log(`driver: successfuly inserted ${result.insertedId}`)
					return result.ops[0];
			})
			.catch(error => {
					throw new Error(error)
					return null;
			})
		console.log(data)
		if (data) return new Subscriber(data.email, data.name);
  },
};

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
	type Subscriber {
		_id: String!
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
