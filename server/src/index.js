import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { typeDefs } from './typeDefs';
import { transactionResolver } from './resolvers/transaction';
import { productResolver } from './resolvers/product';

import { config } from 'dotenv';

// /* Middleware */
// app.use(express.static('public'));
// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.json());

// /* Routes */
// app.use('/blogs', blog);

// app.get('/', (req, res) => {
//   res.status(200).send('Hello world!');
// });

// mongoose
//   .connect(dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((result) =>
//     app.listen(port, () => {
//       console.log(`Server started at http://localhost:${port}`);
//     })
//   )
//   .catch((err) => console.error(err));

const startServer = async () => {
  const app = express();

  config();

  /* Apollo Server Connect with express */
  const server = new ApolloServer({
    typeDefs,
    resolvers: [transactionResolver, productResolver],
    context: ({ req }) => ({ req }),
  });

  server.applyMiddleware({ app });

  /* connect mongoose */
  const dbURI = process.env.dbURI;

  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const port = process.env.port || 3000;
  app.listen({ port }, () => {
    const date = new Date();
    console.log(date);
    console.log(`Server ready at http://localhost:3000${server.graphqlPath}`);
  });
};

startServer();
