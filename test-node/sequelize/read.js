const {Customer} = require('./model')

async function getCustomers(){

    const customers = await Customer.findAll()

    customers.forEach(function listCustomer(customer){
        console.log('Firstname:' + customer.firstName + " Lastname:" + customer.lastName)
    })
    
    if(customers.length === 0){
        console.log('No customers found')
    }
}

getCustomers()