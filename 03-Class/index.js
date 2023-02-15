class ProductManager {

	constructor(products = []){
			this.products = products
	}

	static id = 1

	// uid(){
	//     return String(
	//         Date.now().toString(32) + Math.random().toString(16)
	//     ).replace(/\./g, '')
	// }

	addProduct(title, description, price, thumbnail, code, stock){
		const isIdemCode = this.products.length ?
											 this.products.filter(product => product.code === code).length > 0 : 
											 false

		// const id = this.uid()
		
		if (!isIdemCode) {
			this.products = [...this.products, {
				title,
				description,
				price,
				thumbnail,
				code,
				stock,
				id: ProductManager.id
			}]
			ProductManager.id++
		} else {
				throw new Error('No two codes can be the same')
		}
	}

	getProducts(){
		console.log(this.products);
		return this.products
	}

	getProductByID(id){
		let productByID = this.products.filter(product => product.id === id)
		productByID.length ? console.log(productByID) : console.error('Not Found')
	}
}

// let prueba = new ProductManager()
// prueba.getProducts()
// prueba.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin Imagen', 'abc123', 25)
// console.log(prueba.products.length);
// prueba.getProducts()
// prueba.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin Imagen', 'abc125', 25)
// prueba.getProducts()
// prueba.getProductByID(4)

