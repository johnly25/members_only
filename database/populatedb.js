const { Client } = require("pg")
const {createTables} = require("./createTables")
require('dotenv').config()

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DEV_DB_URL,
    });
    await client.connect();
    await client.query(createTables);
    await client.end();
    console.log("done");
}

main();