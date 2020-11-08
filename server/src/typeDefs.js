import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  type Query {
    transactions: [Transaction!]!
    products: [Product!]
  }

  type Item {
    productId: ID!
    name: String
    amount: Float
    quantity: Int
  }

  input ItemInput {
    name: String
    amount: Float
    quantity: Int
  }

  type Product {
    id: ID!
    name: String
    price: Float
    category: String
  }

  type Transaction {
    id: ID!
    price: Float!
    method: String!
    cardNumber: String!
    paidTime: Date!
    items: [Product]
  }

  input TransactionInput {
    price: Float
    method: String
    cardNumber: String
    items: [ID]
  }

  input ProductInput {
    name: String
    price: Float
    category: String
  }

  type Mutation {
    createTransaction(TransactionInput: TransactionInput!): Transaction
    deleteTransaction(transactionID: ID!): Transaction
    createItem(productId: String, transactionId: ID): Transaction
    deleteItem(productId: String, transactionId: ID): Transaction
    createProduct(ProductInput: ProductInput): Product
    deleteProduct(productId: ID!): Product
  }
`;
