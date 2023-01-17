require('dotenv').config();
const jwt = require('jsonwebtoken')
const fs=require("fs");
const cCA = fs.readFileSync(`${__dirname}/../DigiCertGlobalRootCA.crt.pem`)

conexion = {
    abrir: async (cookies) => {
        const Sequelize = require('sequelize')
        var sequelize;
        var data;
        if(cookies != "login"){
            try {
                data = jwt.verify(cookies, process.env.JWT_SECRET)
            } catch (error) {
                console.log(error)
                data = {data:{rol:cookies}}
            }
        } else {
            data = {data:{rol:cookies}}
        }
        if (data.data.rol == "Technical") {
            console.log("Conectado como Technical")
            sequelize = new Sequelize('cruzroja', process.env.MYSQL_USER, process.env.MYSQL_PASS, {
                host: process.env.MYSQL_URL,
                dialect: 'mysql',
                port: 3306,
                dialectOptions: {
                    ssl: {
                      ca: cCA
                    }}
            })
        } else {
            console.log("Conectado como voluntario")
            sequelize = new Sequelize('cruzroja', process.env.MYSQL_USER_VOLUNTEER, process.env.MYSQL_PASS_VOLUNTEER, {
                host: process.env.MYSQL_URL,
                dialect: 'mysql',
                port: 3306,
                dialectOptions: {
                    ssl: {
                      ca: cCA
                    }}
            })
        }

        await sequelize.authenticate()
            .then(() => {
                console.log("Abierta Sequelize")
            })


        return sequelize;

    },
    cerrar: async (con) => {
        await con.close();
        console.log("Cerrada Sequelize");
    }
}


module.exports = conexion;