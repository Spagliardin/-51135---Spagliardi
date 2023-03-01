import { writeFile, readFile } from "node:fs/promises";

class ProductManager {

  constructor(products = [], path = './') {
    this.products = products
    this.path = path
  }

  uid() {
    return String(
      Date.now().toString(32) + Math.random().toString(16)
    ).replace(/\./g, '')
  }

  async getFile() {
    try {

      const url = `${this.path}products.json`
      const productsFromFile = await readFile(url)
      return productsFromFile

    } catch (error) {
      return null
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {

    this.products = JSON.parse(await this.getFile()) ?? []

    const isIdemCode = this.products ?
      this.products.filter(product => product.code === code).length > 0 :
      false



    if (!isIdemCode) {
      this.products = [...this.products, {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.uid()
      }]

      await writeFile(`${this.path}products.json`, JSON.stringify(this.products))

    } else {
      throw new Error('No two codes can be the same')
    }
  }

  async getProducts() {
    let parsedProducts;
    try {

      parsedProducts = JSON.parse(await this.getFile()) ?? []
      console.log(parsedProducts);
      return parsedProducts

    } catch (error) {

      if (!parsedProducts) console.error('Empty File', []);
      else console.error(error);

    }
  }

  async getProductByID(id) {
    const products = JSON.parse(await this.getFile())
    const productByID = products.filter(product => product.id === id)
    productByID.length ? console.log(productByID, 'Soy getProductByID') : console.error('Product not found')
    return productByID[0]
  }

  async updateProduct(id, product) {

    if (product.id) {
      console.error('the id cannot be changed')
      return
    }

    const productbyID = await this.getProductByID(id)
    const updateProduct = Object.keys(productbyID).reduce((obj, key) => {
      if (product[key]) obj[key] = product[key]
      else obj[key] = productbyID[key]
      return obj
    }, {})
    this.products = await this.deleteProduct(productbyID.id)
    await writeFile(`${this.path}products.json`, JSON.stringify([...this.products, updateProduct]))
  }

  async deleteProduct(id) {
    const productbyID = await this.getProductByID(id)
    const products = await this.getProducts()
    const productsWithoutEliminated = products.filter(products => products.id !== productbyID.id)
    await writeFile(`${this.path}products.json`, JSON.stringify(productsWithoutEliminated))
    return productsWithoutEliminated
  }
}

const test = new ProductManager()
// await test.getProducts()
// await test.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin Imagen', 'abc123', 25)
// await test.getProducts()
// await test.getProductByID('1gq772k3s0454c6a3010bb')
// await test.addProduct('producto test2', 'Este es un producto test 2', 545, 'Sin Imagen', 'abc14', 25)
// await test.addProduct('producto test3', 'Este es un producto test 3', 11, 'Sin Imagen', 'abc1258', 25)
// await test.addProduct('producto test4', 'Este es un producto test 4', 35, 'Sin Imagen', 'abc1254', 55)
// await test.updateProduct('1gq7742o105a36bd80cc10a', {
// 	title: 'producto prueba cambiado 2',
// 	description: 'este es el cambio de prueba 2',
// 	price: '330',
// 	code: 'abc387',
// 	stock: 44
// })

// await test.deleteProduct('1gq7742nt0b01a08b9700f5')