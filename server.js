'use strict'

const Hapi = require('@hapi/hapi')
const Path = require('path')
const AppData = require('./cms/appdata.json')

const init = async () => {
    const server = Hapi.Server({
        port: 3000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo : Path.join(__dirname, 'client', 'build')
            }
        }
    })

    await server.register(require('@hapi/inert'))

    server.route({
        method: 'GET',
        path: '/data',
        handler: (h, request) => {
            return AppData
        }
    })

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler:  { 
            directory: {
                path: '.',
                redirectToSlash: true,
                lookupCompressed: true,
                index: true,
            }
        }
    })

    await server.start()
    console.log('running server on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
    console.log(err)
    process.exit(1)
})

init()