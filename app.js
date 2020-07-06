#!/usr/bin/env node
const utils = require("./utils")
const validator = require("validator")
const chalk = require("chalk")
const yargs = require('yargs')
const howto = require('./howto')
const config = require('./configure')
const fs = require('fs')


yargs.version('2.1.0')


/**
 * USER COMMAND
 */

yargs.command({
    command: 'register',
    describe: 'add user',
    builder: {
        firstName: {
            alias: 'f',
            describe: "Insert first name",
            type: 'string'
        },
        lastName: {
            alias: 'l',
            describe: "Insert last name",
            type: 'string'
        },
        username:{
            alias: 'u',
            describe:"Insert username",
            type: "string",
            demandOption: true
        },
        password:{
            alias: 'p',
            describe: "Insert password",
            demandOption: true
        }

    },
    handler: function(argv) {
        const data = {
            username: argv.username,
            password: argv.password
        }
        howto.request( config.userOptions.register, data, result=>{
            if(result.errors){
                console.log(result.errors)
            }
            else {
                const text = JSON.stringify(result)
                fs.writeFileSync('./confiog.json', text)
                console.log("User registered")
            }
        })
    }
})

yargs.command({
    command: 'login',
    describe: 'Login',
    builder: {
        username: {
            alias: 'u',
            describe: "Insert username",
            demandOption: true,
            type: 'string'
        },
        password: {
            alias: 'p',
            describe: "Insert password",
            demandOption: true,
            type: 'string'
        }

    },
    handler: function(argv) {
        const data = {
            username: argv.username,
            password: argv.password
        }
      howto.request( config.userOptions.login, data, (result)=>{
          if(result.errmsg){
              console.log(result.errmsg)
          }
          else{
              const text = JSON.stringify(result)
              fs.writeFileSync('./config.json', text)
              console.log("User logged")
          }
      })
    }
})

yargs.command({
    command: 'logout',
    describe: 'logout user',

    handler: function(argv) {

        howto.request(config.userOptions.logout,null, (result)=>{
            if(result.errmsg){
                console.log(result.errmsg)
            }
            else{
                console.log(JSON.stringify(result))
                console.log("User logged out")
            }
        })
    }
})

yargs.command({
    command: 'remove',
    describe: 'remove record',
    builder:{
        id:{
            alias: "id",
            describe: "Insert id",
            demandOption: true,
            type: 'number'
        }
    },
    handler: function(argv) {
        console.log('remove')
    }
})


/**
 * APP COMMAND
 */

yargs.command({
    command: 'insert',
    describe: 'insert record',
    builder: {
        title: {
            alias: "t",
            describe: "Insert id",
            demandOption: true,
            type: 'string'
        },
        description: {
            alias: "d",
            describe: "Insert id",
            demandOption: true,
            type: 'string'
        },
        tags: {
            describe: "Insert id",
            demandOption: true,
            type: 'string'
        },
        slug: {
            alias: "s",
            describe: "Insert id",
            demandOption: true,
            type: 'string'
        },
        content: {
            alias: "c",
            describe: "Insert content path",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        const contentData = fs.readFileSync(argv.content,'utf-8')
        const postData = {
            title: argv.title,
            description: argv.description,
            tags: argv.tags,
            slug: argv.slug,
            content: contentData
        }
        howto.request( config.howtoOptions.insert, postData, (result) => {
            if(result.errmsg){
                console.log(result.errmsg)
            } else{
                console.log("Elemento inserito")
            }
        })
    }
})
yargs.command({
    command: 'me',
    describe: 'get my records',
    builder: {
        slugs: {
            alias: "s",
            describe: "lists tags",
            type: 'string'
        }
    },
    handler: function(argv) {
        howto.request( config.howtoOptions.getMe, undefined, (result) => {
            if(result.errmsg){
                console.log(result.errmsg)
            } else{
                if(argv.slug){
                    console.log('Content: '+chalk.red(result.title))
                    console.log('Descrizione: '+chalk.green(result.description))
                    console.log('Tags: '+chalk.blueBright(result.tags))
                    console.log('Contenuto: '+chalk.magenta(result.content))
                }else{
                    result.forEach((item,index)=>{
                        console.log(chalk.yellow(index+1) + ')'+chalk.red(item.title)+' | '+chalk.green(item.slug))
                    })
                }
            }
        })
    },
})

yargs.command({
    command: 'getUser',
    describe: 'get user records',
    builder: {
        slugs: {
            alias: "u",
            describe: "lists tags",
            type: 'string'
        }
    },
    handler: function(argv) {
        howto.request( config.howtoOptions.getUser, undefined, (result) => {
            if(result.errmsg){
                console.log(result.errmsg)
            } else{
                if(argv.slug){
                    console.log('Content: '+chalk.red(result.title))
                    console.log('Descrizione: '+chalk.green(result.description))
                    console.log('Tags: '+chalk.blueBright(result.tags))
                    console.log('Contenuto: '+chalk.magenta(result.content))
                }else{
                    result.forEach((item,index)=>{
                        console.log(chalk.yellow(index+1) + ')'+chalk.red(item.title)+' | '+chalk.green(item.slug))
                    })
                }
            }
        })
    },
})

yargs.command({
    command: 'get',
    describe: 'get post by slug',
    builder: {
        slug: {
            alias: "s",
            describe: "lists tags",
            type: 'string'
        }
    },
    handler: function(argv) {
        howto.request( config.howtoOptions.getPost, undefined, (result) => {
            if(result.errmsg){
                console.log(result.errmsg)
            } else{
                console.log(chalk.red(result.title)+'\n'+chalk.green(result.content))
            }
        })
    },
})

yargs.command({
    command: 'search',
    describe: 'search by tags',
    builder: {
        tags: {
            alias: "t",
            describe: "lists tags",
            type: 'string',
            demandOption: true,
        }
    },
    handler: function(argv) {
        config.howtoOptions.getAll= {
            port: config.port,
            host: config.host,
            path: '/api/global?tags='+argv.tags,
            method: 'GET'
        }
        howto.request( config.howtoOptions.getAll, undefined, (result) => {
            if(result.errmsg){
                console.log(result.errmsg)
            } else{
                result.forEach((item,index)=>{
                    console.log(chalk.yellow(index+1) + ')'+chalk.red(item.title)+' | '+chalk.green(item.slug))
                })
            }
        })
    },
})



yargs.command({
    command: 'edit',
    describe: 'edit record',
    builder:{
        title:{
            alias: "t",
            describe: "Edit title",
            type: 'string',
            demandOption: true
        },
        description:{
            alias: "d",
            describe: "Edit description",
            type: 'string',
            demandOption: true
        },
        tags:{
            describe: "Edit Tags",
            type: 'string',
            demandOption: true
        },
        slug:{
            alias: "s",
            describe: "Insert slug of record to edit",
            type: 'string',
            demandOption: true
        },
        content: {
            alias: "c",
            describe: "Insert content path",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        const contentData = fs.readFileSync(argv.content,'utf-8')
        const postData = {
            title: argv.title,
            description: argv.description,
            tags: argv.tags,
            slug: argv.slug,
            content: contentData
        }
        howto.request( config.howtoOptions.edit, postData, (result) => {
            if(result.nModified==0){
                console.log("Nessun elemento modificato")
            } else{
                console.log(result)
                console.log("Elemento modificato")
            }
        })
    }
})
yargs.command({
    command: 'delete',
    describe: 'delete record',
    builder:{
        slug:{
            alias: "s",
            describe: "Insert id",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        const postData = {
            slug: argv.slug
        }
        howto.request(config.howtoOptions.remove, postData, (result) => {
            if (result.deletedCount==0) {
                console.log("Nessun elemento rimosso")
            } else {
                console.log("Elemento rimosso")
            }
        })
    }
})

yargs.parse()
