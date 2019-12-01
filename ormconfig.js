module.exports = {
    "type": "mysql",
    "port": process.env.DBPORT,
    "host": process.env.HOST,
    "username": process.env.DBUSER,
    "password": process.env.DBPASSWORD,
    "database": process.env.DATABASE,
    "entities": [
        "src/**/*.entity{.ts,.js}"
    ],
    "synchronize": false
}