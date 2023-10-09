import { ProductType, productCollection } from "./db";

export const productsRepository = {
  async findProducts(title: string | null | undefined) {
    const filter: any = {};
    if (title) {
      filter.title = { $regex: title };
    }
    return productCollection.find(filter).toArray();
  },

  async createProducts(title: string) {
    const newProduct = { id: +new Date(), title: title };
    await productCollection.insertOne(newProduct);
    return newProduct;
  },

  async getProductById(id: number) {
    let product: ProductType | null = await productCollection.findOne({ id });
    if (product) {
      return product;
    } else {
      return null;
    }
  },

  async updateProduct(id: number, title: string) {
    let result = await productCollection.updateOne({ id }, { $set: { title } });
    return result.matchedCount === 1;
  },

  async deleteProduct(id: number) {
    let result = await productCollection.deleteOne({ id });
    return result.deletedCount === 1;
  },
};
