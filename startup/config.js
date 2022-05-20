const config = require('config')

module.exports = function () {
    
    if (!config.get('jwtSecretToken')) {
        throw new Error('FATAL ERROR: JWTSECRETTOKEN IS NOT DEFINE')
        
    }
}