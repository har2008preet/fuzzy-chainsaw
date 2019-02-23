import {MongoDb} from '../db/mongo.db';

let fetch = require("node-fetch");

async function getusers() {
    const mongo = new MongoDb();
    await mongo.connect();

    const db = mongo.getDb("master");

    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let data = await response.json();

    for (const element of data) {
        console.log(element)
        console.log("--------------------------------------------------")
        if (db) {

            await db.collection('users').insertOne(element, (err, result) => {
                    if (err) {
                        console.log("error with user id ", element.id + ", error: "+ err)
                    }else{
                        console.log("user with id ", element.id + " successfully inserted")
                    }
                });
        } else {
            console.log("could not connect to the db");
        }
    }

    await mongo.close();
}

getusers();