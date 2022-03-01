const mongoose = require('mongoose')

module.exports = async () => {
    try {
        const con = await mongoose.connect(process.env.DB_CONNECT);

        console.log('database connected')
    } catch {
        console.log('could not connect to database')
    }
}