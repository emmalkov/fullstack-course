module.exports = (res, error) => {
    res.status(500).json({
        seccess: false,
        message: error.message ? error.message : error
    })
}