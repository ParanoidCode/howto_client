const fs = require('fs')
const chalk = require('chalk')
const datafile = 'data.json'
const req = require('./requests')
const loadData = function(filename){
    try{
        const dataBuffer = fs.readFileSync(filename)
        const dataString = dataBuffer.toString()
        return JSON.parse(dataString)
    } catch(e){
        return []
    }
}

const getPatient = function(item){
    console.log(chalk.yellow('id: ') + chalk.cyan(item.id))
    console.log(chalk.yellow('First name: ') + chalk.cyan(item.firstName))
    console.log(chalk.yellow('Last name: ') + chalk.cyan(item.lastName))
    console.log(chalk.yellow('Symptoms: ') + chalk.cyan(item.symptoms))
    console.log(chalk.yellow('Swab: ') + chalk.cyan(item.swab))
    console.log("--------------------------------------------")

}

const getList = function() {
    req.showRequest()
    /*const dataJSON = loadData(datafile)
    dataJSON.forEach((item, index)=> {
        console.log(chalk.yellow('id: ') + chalk.cyan(item.id))
        console.log(chalk.yellow('First name: ') + chalk.cyan(item.firstName))
        console.log(chalk.yellow('Last name: ') + chalk.cyan(item.lastName))
        console.log(chalk.yellow('Symptoms: ') + chalk.cyan(item.symptoms))
        console.log(chalk.yellow('Swab: ') + chalk.cyan(item.swab))
        console.log("--------------------------------------------")
    })*/

}

const addPatient = function(patient){
    req.insertRequest()
    // const dataJSON = loadData(datafile)
    // dataJSON.push(patient)
    // console.log(chalk.bgCyan.black(`Patient added with id: ${patient.id}`))
    // console.log(chalk.magenta('Summary: '))
    // savePatient(dataJSON)
    // getPatient(patient)

}

const editPatient = function(patient){
    const dataJSON = loadData(datafile)
    const index = dataJSON.findIndex((item)=>{
        return item.id === patient.id
    })
    if(index>=0){
        dataJSON[index].firstName = (patient.firstName !== undefined) ? patient.firstName : dataJSON[index].firstName
        dataJSON[index].lastName = (patient.firstName !== undefined) ? patient.firstName : dataJSON[index].lastName
        dataJSON[index].symptoms = (patient.symptoms !== undefined) ? patient.symptoms : dataJSON[index].symptoms
        dataJSON[index].swab = (patient.swab !== undefined) ? patient.swab : dataJSON[index].swab
    }

    savePatient(dataJSON)
    console.log(chalk.bgCyan.black('Patient update!'))
}

const removePatient = function(id){
    let dataJSON = loadData(datafile)

    const patientToKeep = dataJSON.filter((item)=>{
        return item.id !== id
    })
    if(dataJSON.length > patientToKeep.length){
        console.log(chalk.bgCyan.black(`Patient with id: ${id} removed succesfuly!`))
        savePatient(patientToKeep)
    }
    else{
        console.log(chalk.bgRed.black('Patient not found'))
    }


}

const savePatient = function(dataJSON){
    const dataString = JSON.stringify(dataJSON, null, 4)
    fs.writeFileSync(datafile, dataString)
}

module.exports = {
    filename : datafile,
    loadData : loadData,
    getPatient : getPatient,
    getList : getList,
    addPatient : addPatient,
    editPatient : editPatient,
    removePatient : removePatient
}