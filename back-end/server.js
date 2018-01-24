'use strict'

const Hapi = require('hapi')

const server = Hapi.server({ 
    host: 'localhost', 
    port: 3001
})

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
    path:'/cars', 
    handler: (request, h) => {
        return { cars: [{
                make: "Toyota",
                model: "Tacoma",
                year: 2009,
                mileage: 100000
            },{
                make: "BMW",
                model: "i8",
                year: 2018,
                mileage: 1
            }]
        }
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