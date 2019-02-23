import {MongoDb} from '../db/mongo.db';

let fetch = require("node-fetch");

async function getFromUrl(url) {
    let response = await fetch(url);
    let data = await response.json();

    return data
}

async function main() {
    const mongo = new MongoDb();
    await mongo.connect();

    let postsRes = await getFromUrl("https://jsonplaceholder.typicode.com/posts")
    let commentsRes = await getFromUrl("https://jsonplaceholder.typicode.com/comments")
    // console.log(postsRes)

    // console.log("--------------------------------------------------------")

    // console.log(commentsRes)

    for(const comment of commentsRes){
        let postID = comment.postId
        console.log("Comment ID: ", comment.id)
        console.log("Post ID: ", postID)
        console.log("-------------------------")
        if(postsRes[postID-1].comments==null){
            postsRes[postID-1].comments = []
        }
        postsRes[postID-1].comments.push(comment)
    }

    // console.log(postsRes)

    for(const post of postsRes){
        let userId = post.userId

        let dbName = "user_"+userId

        const db = await mongo.getDb(dbName);

        if (db) {
            await db.collection('posts').insertOne(post, (err, result) => {
                if (err) {
                    console.log("error with user id ",userId + ", error: "+ err)
                }else{
                    console.log("Post of user with id ", userId + " successfully inserted")
                }
            });
        } else {
            console.log("could not connect to the db");
        }

        await mongo.close();


    }

}
main()