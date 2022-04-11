const { customerStorage } = require('../storage');

const Customer = require('../storage/model/Customer');

const { 
  GraphQLObjectType, 
  GraphQLString, GraphQLInt, GraphQLBoolean, 
  GraphQLList, GraphQLNonNull, GraphQLSchema 
} = require('graphql');

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    age: {type: GraphQLInt},
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: {type: GraphQLInt},
      },
      resolve(parentValue, args) {
        return customerStorage.selectById(args.id);

      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return customerStorage.selectAll();
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: GraphQLBoolean,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parentValue, args) {
        const {id, name, email, age} = args;
        return customerStorage.insert(new Customer(id, name, email, age));
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parentValue, args) {
        return customerStorage.deleteById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})
