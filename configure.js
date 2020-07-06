const yargs = require('yargs')
const PORT = 3000
const HOST = 'localhost'

const option = {
    user:{
        register: {
            port: PORT,
            host: HOST,
            path: '/users',
            method: 'POST'
        },
        login: {
            port: PORT,
            host: HOST,
            path: '/users/login',
            method: 'POST'
        },
        logout: {
            port: PORT,
            host: HOST,
            path: '/users/logout',
            method: 'POST'
        },
        update: {
            port: PORT,
            host: HOST,
            path: '/users/login',
            method: 'PATCH'
        },
        delete: {
            port: PORT,
            host: HOST,
            path: '/users/login',
            method: 'DELETE'
        }
    },
    howto:{
        getAll: {
            port: PORT,
            host: HOST,
            path: '/api/global',
            method: 'GET'
        },
        getUser: {
            port: PORT,
            host: HOST,
            path:  '/api/user/'+yargs.argv.username,
            method: 'GET'
        },
        getMe: {
            port: PORT,
            host: HOST,
            path:  (yargs.argv.slug === undefined ? '/api/me' : '/api/me/'+yargs.argv.slug),
            method: 'GET'
        },
        getPost: {
            port: PORT,
            host: HOST,
            path:  (yargs.argv.slug === undefined ? '/api/user/myusername/'+yargs.argv.slug : '/api/user/myusername/'+yargs.argv.slug),
            method: 'GET'
        },
        insert: {
            hostname: HOST,
            port: PORT,
            path: '/api/insert/',
            method: 'POST',

        },
        edit:{
            hostname: HOST,
            port: PORT,
            path: '/api/edit/'+yargs.argv.slug,
            method: 'PUT',

        },
        remove:{
            hostname: HOST,
            port: PORT,
            path: '/api/remove/'+yargs.argv.slug,
            method: 'DELETE',
        }
    }
}

exports.userOptions = option.user
exports.howtoOptions = option.howto
exports.port = PORT
exports.host = HOST