const fs = require("fs")
const chalk = require("chalk")


const getNote = function(filename){
    return fs.readFileSync(filename,'UTF-8')
}



exports.getNote = getNote

