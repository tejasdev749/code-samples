const getDestination = new Promise(function (resolve,reject){
    resolve("Curacao")
})

const orderCab = function (destination){
    return new Promise(function (resolve, reject){
        resolve("Cab booked for " + destination)
    })
}

function planTrip(){
    getDestination.then(orderCab).then(function (cabMessage){
        console.log(cabMessage)
    })
}

module.exports = {
    planTrip
}
