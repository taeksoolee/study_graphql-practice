const port = 4000;

const express = require('express');
const {graphqlHTTP} = require('express-graphql');

const app = express();
const schema = require('./schema');

app.use(require('cors')());


app.use('/graphql', graphqlHTTP({
  schema, graphiql: true,
}))

app.listen(port, () => {
  console.log(`listening on ${port}`)
})