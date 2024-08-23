const databaseConnectionString = 'mongodb://localhost:27017'

const { MongoClient } = require('mongodb')

const dbName = 'notscrapyet'

let client

async function connectToDatabase() {
    client = new MongoClient(databaseConnectionString)
    await client.connect()
    console.log('INFO: Connected to MongoDB')
}

function getClient() {
    return client
}

module.exports = { connectToDatabase, getClient, dbName }
