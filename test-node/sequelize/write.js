const { createTables, createProductModel } = require('./model')
const { Op } = require('sequelize');

async function addCustomer(customerModel, customer) {
    await customerModel.create(customer)
}

function addCustomers(customerModel) {
    try {
        const tejas = {
            firstName: 'Tejas',
            lastName: 'Deogadkar',
            email: 'abc@gmail.com',
            country: 'Germany'
        }
        addCustomer(customerModel, tejas)

        const kamlesh = {
            firstName: 'Kamlesh',
            lastName: 'Zanjad',
            email: 'abc@gmail.com',
            country: 'Mexico'
        }

        addCustomer(customerModel, kamlesh)

        const milan = {
            firstName: 'Milan',
            lastName: 'Naik',
            email: 'm.n@gmail.com',
            country: 'Uruguay'
        }

        addCustomer(customerModel, milan)

        const sateesh = {
            firstName: 'Sateesh',
            lastName: 'Reddy',
            email: 's.r@gmail.com',
            country: 'Paraguay'
        }

        addCustomer(customerModel, sateesh)
    } catch (error) {
        console.log("Error" + error)
    }
}

async function getCustomersFirstName(customerModel) {
    const customers = await customerModel.findAll({
        attributes: ['lastName']
    })
    return customers
}
async function loadCustomers() {
    const { Customer: customerModel, Order } = await createTables()
    addCustomers(customerModel)

}

async function displayCustomers() {
    const { Customer: customerModel, Order } = await createTables()
    const addedCustomers = await getCustomersFirstName(customerModel)
    console.log(JSON.stringify(addedCustomers, null, 4))
}

async function getCustomerById(id) {
    const { Customer } = await createTables();
    const result = await Customer.findAll({
        where: {
            firstName: [4]
        }
    })
    return result
}

async function updateCustomer() {
    const { Customer } = await createTables();
    const query = await Customer.update(
        {
            lastName: 'Alex'
        },
        {
            where: {
                firstName: 'Tejas'
            }
        })
}

loadCustomers()
displayCustomers()
findCustomer()
findCustomerByCountry()
updateCustomer()
async function findCustomer() {
    const customer = await getCustomerById(2)
    console.log(JSON.stringify(customer, null, 4))
}

async function findCustomerByCountry() {
    const { Customer } = await createTables()
    const result = await Customer.findAll({
        where: {
            [Op.or]: {
                firstName: 'Tejas',
                country: {
                    [Op.like]: '%uay'
                }
            }
        }
    })
    console.log('Customers by country:', result)
}

async function getProductModel() {
    const products = createProductModel()
    await products.sync({ force: true })
    return products
}


async function loadProducts() {
    const products = await getProductModel()
    const chaisProduct = {
        productName: 'Chais',
        supplierId: 1,
        categoryId: 1,
        unit: 10,
        price: 18
    }
    addProduct(products, chaisProduct)
    const changProduct = {
        productName: 'Chang',
        supplierId: 1,
        categoryId: 1,
        unit: 24,
        price: 19
    }
    addProduct(products, changProduct)
    const syrupProduct = {
        productName: 'Aniseed Syrup',
        supplierId: 1,
        categoryId: 2,
        unit: 12,
        price: 10
    }
    addProduct(products, syrupProduct)
}

loadProducts()
getProducts()

async function getProducts() {
    const productModel = await getProductModel()
    const products = await productModel.findAll({
        order: [
            // Will escape price and validate DESC against a list of valid direction parameters
            ['price', 'DESC'],
        ]
    })
    console.log(JSON.stringify(products, null, 4))
}
async function addProduct(productModel, newProduct) {
    await productModel.create(newProduct)
}