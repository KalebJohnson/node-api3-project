module.exports = () => {
    return (req, res, next) => {
        const time = new Date().toUTCString()
        console.log( `${time} ${req.ip} ${req.method} ${req.url}`)

        
        next()
    }
}