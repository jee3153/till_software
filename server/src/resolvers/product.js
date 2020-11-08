import { Product } from '../models/Product';

export const productResolver = {
  Query: {
    products: async () => {
      try {
        const products = await Product.find();
        return products;
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  Mutation: {
    createProduct: async (_, { ProductInput }) => {
      try {
        const newProduct = await Product.create(ProductInput);
        console.log(newProduct);
        await newProduct.save();
        return newProduct;
      } catch (error) {
        console.error(error.message);
      }
    },
    deleteProduct: async (_, { productId }) => {
      const deleteProduct = await Product.findByIdAndDelete(productId);
      if (deleteProduct) {
        console.log(`Product ${productId} has been deleted.`);
        return deleteProduct;
      } else {
        console.log(`Product ${productId} doesn't exist`);
      }
    },
  },
};
