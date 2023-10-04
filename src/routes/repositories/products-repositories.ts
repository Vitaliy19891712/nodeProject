let products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];

export const productsRepository = {
  findProducts(title: string | null | undefined) {
    if (title) {
      return products.filter((p) => p.title.indexOf(title));
    } else {
      return products;
    }
  },
  createProducts(title: string) {
    const newProduct = { id: +new Date(), title: title };
    products.push(newProduct);
    return newProduct;
  },
  getProductById(id: number) {
    let product = products.find((prod) => prod.id === id);
    return product;
  },
  updateProduct(id: number, title: string) {
    let product = products.find((prod) => prod.id === id);
    if (product) {
      let newProduct = { id: id, title: title };
      products = [...products, newProduct];
      return true;
    } else {
      return false;
    }
  },
  deleteProduct(id: number) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};
