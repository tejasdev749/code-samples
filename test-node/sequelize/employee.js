const { createEmployeeTable } = require('./model')
const { Op } = require('sequelize');

async function addEmployees() {
    const employee = await createEmployeeTable()
    await employee.bulkCreate([{
        firstName: 'Tejas',
        lastName: 'Deogadkar',
        email: 'abc@gmail.com',
        country: 'Germany'
    },
    {
        firstName: 'Kamlesh',
        lastName: 'Zanjad',
        email: 'abc@gmail.com',
        country: 'Mexico'
    }], {
        validate: true
    })
}
addEmployees()