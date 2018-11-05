const fs = require('fs')

module.exports = async fileName => {
    await fs.unlink(fileName)
}