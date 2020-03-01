const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://********@cluster0-3nyyj.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, });

client.connect(err => {
  const collection = client.db("hackernoon-subscribers").collection("subscribers");
  const subscriber = {
    email: 'borntolive@mail.com',
    name: 'john doe'
  }

  return collection.insertOne(subscriber)
    .then(result => {
        console.log(`successfuly inserted ${result.insertedId}`)
        client.close()
        return result.insertedId;
    })
    .catch(error => {
        return new Error(error)
    })
});
