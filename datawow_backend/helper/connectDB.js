const { MongoClient } = require("mongodb");

const url ="mongodb://localhost:27017";

const dbname = "datawow";

let db = null;
const client = new MongoClient(url);

async function getDatabase(){
    try{
        await client.connect();
        db = client.db(dbname);
        return db;
    }catch(err){
        console.log(err)
        throw new Error(err);
    }
}

module.exports = {getDatabase,client};
