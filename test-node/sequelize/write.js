const { createTables } = require('./model')
const { Op } = require('sequelize');

async function addCustomer(customerModel, customer) {
    await customerModel.create(customer)
}

function addCustomers(customerModel) {
    try {
        const tejas = {
            firstName: 'Tejas',
            lastName: 'Deogadkar',
            email: 'abc@gmail.com'
        }
        addCustomer(customerModel, tejas)

        const kamlesh = {
            firstName: 'Kamlesh',
            lastName: 'Zanjad',
            email: 'abc@gmail.com'
        }

        addCustomer(customerModel, kamlesh)

        const milan = {
            firstName: 'Milan',
            lastName: 'Naik',
            email: 'm.n@gmail.com'
        }

        addCustomer(customerModel, milan)

        const sateesh = {
            firstName: 'Sateesh',
            lastName: 'Reddy',
            email: 's.r@gmail.com'
        }

        addCustomer(customerModel, sateesh)
    } catch (error) {
        console.log("Error" + error)
    }
}

async function getCustomersFirstName(customerModel) {
    const customers = await customerModel.findAll({
        attributes: ['firstName']
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
            firstName: {
                [Op.or]: ['Tejas', 'Kamlesh']
            }
        }
    })
    return result
}

loadCustomers()
displayCustomers()
findCustomer()
async function findCustomer() {
    const customer = await getCustomerById(2)
    console.log(JSON.stringify(customer, null, 4))
}
