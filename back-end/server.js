'use strict'

const Hapi = require('hapi')
const Monk = require('monk')

const server = Hapi.server({ 
    host: 'localhost', 
    port: 3001
})

const getCarsCollection = async () => {
    const connectionString = "mongodb://khaleo:shelby2010@ds117859.mlab.com:17859/dealership"
    const db = Monk(connectionString)
    const cars = await db.get("cars")
    return cars
}

server.route({
    method: 'GET',
    path:'/', 
    handler: (request, h) => {
        return { message: 'hello world' }
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

server.route({
    method: 'GET',
    path:'/planes', 
    handler: (request, h) => {
        return { planes: [
            {
                name: "plane1",
                size: "1"
            },
            {
                name: "plan2",
                size: "10"
            },
            {
                name: "plane3",
                size: "100"
            }
        ]}
},
config: {
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
    }
}
})

const findCarWithMaxMileage = (prevCar, currCar) => {
    return prevCar.mileage > currCar.mileage ? prevCar : currCar
}

const findCarWithMinMileage = (prevCar, currCar) => {
    return prevCar.mileage < currCar.mileage ? prevCar : currCar
}

const findCarMake = (prevCar, currCar) => {
        return(prevCar.make === undefined ? prevCar: prevCar.make)
             + "," + currCar.make
}

server.route({
    method: 'GET',
    path:'/cars', 
    handler: async (request, h) => {
        const cars = await getCarsCollection()
        const carObjects = await cars.find()
        console.log(carObjects)
        return { cars: carObjects ? carObjects : [] }
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})


server.route({
    method: 'GET',
    path:'/cars/mileage/max', 
    handler: async (request, h) => {
        const carsCollection = await getCarsCollection()
        const cars = await carsCollection.find()
        
        if (cars.length === 0)
            return { car: null }

        const carWithMaxMileage = cars
        .reduce(findCarWithMaxMileage)

        return { car: carWithMaxMileage}
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

server.route({
    method: 'GET',
    path:'/cars/mileage/min', 
    handler: async (request, h) => {
        const carsCollection = await getCarsCollection()
        const cars = await carsCollection.find()
        
        if (cars.length === 0)
            return { car: null }

        const carWithMinMileage = cars
        .reduce(findCarWithMinMileage)

        return { car: carWithMinMileage}
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

server.route({
    method: 'GET',
    path:'/cars/make/all', 
    handler: async (request, h) => {
        const carsCollection = await getCarsCollection()
        const cars = await carsCollection.find()
        
        if (cars.length === 0)
            return { makes: "make1,make2,make3" }

        const carMake = cars
        .reduce(findCarMake)

        return { car: carMake}
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

server.route({
    method:'POST',
    path:'/cars',
    handler: async (request, h) => {
        const cars = await getCarsCollection()
        cars.insert(request.payload)
        console.log(request.payload)
        return h.response('success')
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }   
})

async function start() {
    try {
        await server.start()
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
    console.log('Server running at:', server.info.uri)
}

start()