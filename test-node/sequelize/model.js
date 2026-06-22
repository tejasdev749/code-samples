const { DataTypes } = require("sequelize")
const { initiateConnection } = require('./connection')

async function testConnection(connection) {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
        return true
    } catch (error) {
        return false
    }
}

async function createTables() {
    try {
        const connection = initiateConnection()
        if (testConnection(connection)) {
            const Customer = connection.define('Customer', {
                customerId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                lastName: {
                    type: DataTypes.STRING,
                },
                email: {
                    type: DataTypes.STRING
                },
                dob: {
                    type: DataTypes.DATE
                },
                favoriteColor: {
                    type: DataTypes.STRING,
                    defaultValue: 'Green'
                },
                country: {
                    type: DataTypes.STRING,
                }
            })


            const Order = connection.define('Order', {
                orderId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                noOfItems: DataTypes.INTEGER,
                items: DataTypes.TEXT,
                time: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW
                },
                customerOrderId: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Customer,
                        key: 'customerId'
                    }
                }
            })
            await Order.sync({
                force: true
            })
            await Customer.sync({
                alter: true
            })
            return { Customer, Order }
        }

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

function createProductModel() {
    try {
        const connection = initiateConnection()
        if (testConnection(connection)) {
            const products = connection.define('Product', {
                productId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                productName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                supplierID: {
                    type: DataTypes.INTEGER,
                },
                categoryID: {
                    type: DataTypes.INTEGER,
                },
                unit: {
                    type: DataTypes.INTEGER,
                    defaultValue: 1
                },
                price: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                }
            })
            return products
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

async function createEmployeeTable() {
    try {
        const connection = initiateConnection()
        if (testConnection(connection)) {
            const Employee = connection.define('Employee', {
                empId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                lastName: {
                    type: DataTypes.STRING,
                },
                email: {
                    type: DataTypes.STRING,
                    validate: {
                        len: [20, 30]
                    }
                },
                dob: {
                    type: DataTypes.DATE
                },
                favoriteColor: {
                    type: DataTypes.STRING,
                    defaultValue: 'Green'
                },
                country: {
                    type: DataTypes.STRING,
                }
            })
            await Employee.sync({
                force: true
            })

            return Employee
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


module.exports = {
    createTables,
    createProductModel,
    createEmployeeTable
}