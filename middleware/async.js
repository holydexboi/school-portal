module.exports = function (handleer) {
    
    return async (req, res, next) => {
        try {
            await handleer(req, res);
        } catch (ex) {
            next(ex)
        }
    }
}