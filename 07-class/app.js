import express from "express";
import { response, request } from "express";
import { ProductManager } from "./model/product-manager.js";

const PORT = 8080;
const app = express()

const productManager = new ProductManager()

app.use(express.urlencoded({extended: true}))
app.get('/products', async (req = request, res = response) => {
  
  const limit = req.query.limit
  const listProducts = await productManager.getProducts()
  const listWithLimit = listProducts.slice(0, limit)
  
  limit ? 
  res.send(listWithLimit) :
  res.send(listProducts)

  // http://localhost:8080/products?limit=1
  // http://localhost:8080/products
})

app.get('/products/:pid', async (req = request, res = response) => {
  
  const uid = req.params.pid
  const listProducts = await productManager.getProductByID(uid)
  
  res.send(listProducts)

  // http://localhost:8080/products/1gqv6lhj70af252b98466b5
})

app.listen( PORT , () => {
  console.log('Server corriendo en puerto ' + PORT);
})