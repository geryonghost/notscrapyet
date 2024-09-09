// const databaseConnectionString = process.env.databaseConnectionString
// const databaseName = process.env.databaseName
const databaseConnectionString = 'mongodb://localhost:27017'
const databaseName = 'notscrapyet'

const { MongoClient } = require('mongodb')

let client

async function connectToDatabase() {
    client = new MongoClient(databaseConnectionString)
    await client.connect()
    console.log('Info Connected to MongoDB')
}

function getClient() {
    return client
}

module.exports = { connectToDatabase, getClient, databaseName }
