const {Customer} = require('./model')
const {createTables} = require('./connection')

async function addCustomer(customer){
    const newCustomer = await Customer.create(customer)
    console.log(JSON.stringify(newCustomer, null, 4))
}

async function insertData(){
    try{
        const tejas = {
            firstName: 'Tejas',
            lastName: 'Deogadkar',
            email: 'abc@gmail.com'
        }
        await createTables()
        await addCustomer(tejas)
        console.log('Customer added')
        const kamlesh = {
            firstName: 'Kamlesh',
            lastName: 'Zanjad',
            email: 'abc@gmail.com'
        }
        
        addCustomer(kamlesh)
        console.log('Customer added')
    }catch(error){
        console.log("Error" + error)
    }
}

insertData()

async function getCustomers(){
    const customers = await Customer.findAll()
    console.log(customers)
}
try{
    getCustomers()
}catch(error){
    console.log(error)
}
