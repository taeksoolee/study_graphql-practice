const port = 4000;

const express = require('express');
const {graphqlHTTP} = require('express-graphql');

const app = express();
const schema = require('./schema');

app.use(require('cors')());

app.use('/graphql', graphqlHTTP({
  schema, 
  graphiql: true,
}));

const counter = {
  _val: 0,
  add() {
    this._val++;
  },
  get val() {
    return this._val;
  },
}

const fruits = ['MANGO', 'APPLE', 'BANANA'];

const {buildSchema} = require('graphql');
app.use('/v1/graphql', graphqlHTTP({
  schema: buildSchema(`
    enum Fruit {
      MANGO APPLE BANANA
    }

    type Counter {
      curr: Int
      result: Boolean
    }

    type Query {
      hello: String
      counter(num: Int!): Counter
      fruits(sliceVal: Int): [String]
      randomFruit: Fruit
    }
  `),
  rootValue: {
    hello(args) {
      return 'world';
    },
    counter(args) {
      counter.add(); 
      return {
        curr: counter.val || 0,
        result: counter.val === args.num,
      };
    },
    fruits(args) {
      const {sliceVal} = args;
      return fruits.slice(0,sliceVal);
    },
    randomFruit(args) {
      return fruits[Math.floor(Math.random()*3)];
    }
  },
  graphiql: true,
}))

app.listen(port, () => {
  console.log(`listening on ${port}`)
})