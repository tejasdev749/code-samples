const { DataTypes } = require("sequelize")
const {connectDB} = require('./connection')

const connection = connectDB();

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
    }
})

const Order = connection.define('Order', {
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    noOfItems: DataTypes.INTEGER,
    items:  DataTypes.TEXT,
    time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW 
    },
    customerOrderId: {
        type:DataTypes.INTEGER,
        references: {
            model: Customer,
            key: 'customerId'
        }
    }
})

module.exports = {
    Customer,
    Order,
}