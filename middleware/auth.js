const jwt = require('jsonwebtoken')
const config = require('config')

function auth(req, res, next) {
    const token = req.header('auth-token')
    
    if (!token) return res.status(401).send('Access denied')
    
    try {
        
        const decoded = jwt.decode(token, config.get('schoolPrivateKey'))
        req.user = decoded
        next()
    }
    catch (err) {
        res.status(400).send('Invalid User')
    }
}

module.exports = auth

