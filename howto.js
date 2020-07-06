const fs = require('fs')
const chalk = require('chalk')
const http = require('http')
const querystring = require('querystring');
const yargs = require('yargs')
var prettyjson = require('prettyjson');

const authJSON = fs.readFileSync('./config.json','utf-8')
const auth = JSON.parse(authJSON)

const request = function(option, postData, callback){

    let data = undefined
    if(auth.token!==undefined){
        option["headers"]= {
            'Authorization': "Bearer " + auth.token
        }
    }
    if(postData !== undefined){
        data = querystring.stringify(postData)
        option["headers"]={
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data),
            'Authorization': "Bearer " + auth.token

        }
    }
    const req = http.request(option, (res) => {
        //console.log(option)
        const headers = req.getHeaderNames()
        //console.log(`STATUS: ${res.statusCode}`);
        //console.log(`HEADERS: ${JSON.stringify(res.headers, null, 4)}`);
        res.setEncoding('utf8');

        res.on('clientError', (error)=>{
            console.log("Errore "+error)
        })

        res.on('data', (chunk) => {
            try {
                callback(JSON.parse(chunk))
            }
            catch(e){
                callback(chunk)
            }

        });
        res.on('end', () => {
            console.log('End request.');
        });
    }).on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    })
    if(data !== undefined){
        req.write(data)
    }

    req.end()
}



module.exports = {
    request : request
}

