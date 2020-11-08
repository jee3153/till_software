import { Transaction } from '../models/transaction';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export const transactionResolver = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string
      }
      return null;
    },
  }),

  Transaction: {
    items: async (transaction) => {
      return (await transaction.populate('items').execPopulate()).items;
    },
  },

  Query: {
    transactions: async () => {
      try {
        const transactions = await Transaction.find();
        return transactions;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    createTransaction: async (_, { TransactionInput }) => {
      try {
        const newtransaction = await Transaction.create(TransactionInput);
        await newtransaction.save();
        return newtransaction;
      } catch (error) {
        console.error(error.message);
      }
    },
    deleteTransaction: async (_, { transactionID }) => {
      try {
        const deleteTransaction = await Transaction.deleteOne({
          _id: transactionID,
        });
        if (deleteTransaction) {
          console.log(`item ${transactionID} deleted`);
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    createItem: async (_, { productId, transactionId }) => {
      const transaction = await Transaction.findById(transactionId);
      await transaction.items.push(productId);
      const savedTransaction = transaction.save();
      return savedTransaction;
    },
  },
};
