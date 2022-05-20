const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')

module.exports = function () {
    
    winston.add( winston.createLogger({
        exceptionHandlers: [
            new winston.transports.Console({level: 'info', format: winston.format.combine(winston.format.colorize(), winston.format.simple(), winston.format.prettyPrint(), winston.format.json())}),
            new winston.transports.File({filename: 'exception.log'}),
        ]
    }))
        
    process.on('unhandledRejection', (ex) => {
        
        throw ex
    })
    
    const file = new winston.transports.File({ filename: 'logfile.log', format: winston.format.json() },)
    const console = new winston.transports.Console( {level: 'info', format: winston.format.combine(winston.format.colorize(), winston.format.simple())})
    const db = new winston.transports.MongoDB({ db: 'mongodb://localhost/election', useNewUrlParser: true, useUnifiedTopology: true, level: 'info'})
    
    winston.add(file)
    winston.add(db)
    winston.add(console)
}