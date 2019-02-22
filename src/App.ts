import * as bodyParser from 'body-parser';
import * as express from 'express';
// tslint:disable-next-line:no-implicit-dependencies
import { Router } from 'express-serve-static-core';
import {MongoDb} from "./db/mongo.db";
import * as HttpStatus from 'http-status-codes';
import {response} from "express";
import {mongo} from "mongoose";
// import { mountRoutes } from './routes';

/**
 * class for defining the routes and used
 *
 * @export
 */
export class App {
    public express;

    public constructor() {
        this.express = express();
        const router = express.Router();

        this.express.use(bodyParser.urlencoded({
            'extended': false,
         }));

        this.express.use(bodyParser.json());

        this.mountTestRoute(router);
        // mountRoutes(router);

        this.mountUserRoutes(router);

        this.express.use('/', router);
    }


    private mountUserRoutes(router: Router): void {
        router.get('/users',async (req, res) => {
            const mongo = new MongoDb();
            await mongo.connect();
            const db = mongo.getDb("master");
            db.collection('users', (error, collection) => {
                if (error) {
                    res.json(error);
                    res.statusCode = HttpStatus.BAD_REQUEST;

                    return;
                }

                collection
                    .find()
                    .toArray((arrayError, result) => {
                        if (arrayError) {
                            res.json(arrayError);
                            res.statusCode = HttpStatus.BAD_REQUEST;
                        }

                        res.json(result);
                        res.statusCode = HttpStatus.OK;
                    });
            });

            mongo.close();
        });

        router.get('/users/:id',async (req, res) => {
            let userId = req.params.id;
            if(isNaN(userId) || userId.includes(".")|| userId.includes("-")){
                res.json({"message":"invalid user ID"});
                res.statusCode = HttpStatus.OK;
                return
            }

            const mongo = new MongoDb();
            await mongo.connect();
            const db = mongo.getDb("master");
            db.collection('users', (error, collection) => {
                if (error) {
                    res.json(error);
                    res.statusCode = HttpStatus.BAD_REQUEST;

                    return;
                }
                collection.findOne({"id": Number(userId)}, function (err, result) {
                    if(err){
                        res.json(err);
                        res.statusCode = HttpStatus.BAD_REQUEST;

                        return;
                    }
                    res.json(result)
                    res.statusCode = HttpStatus.OK

                    return
                })
            });
        })

        router.get('/users/:id/posts',async (req, res) => {
            let userId = req.params.id;
            if(isNaN(userId) || userId.includes(".")|| userId.includes("-")){
                res.json({"message":"invalid user ID"});
                res.statusCode = HttpStatus.OK;
                return
            }
            const mongo = new MongoDb();
            await mongo.connect();

            let dbName = "user_"+userId

            const db = mongo.getDb(dbName);

            db.collection('posts', async (error, collection) => {
                if (error) {
                    res.json(error);
                    res.statusCode = HttpStatus.BAD_REQUEST;

                    return;
                }

                collection
                    .find()
                    .toArray((arrayError, result) => {
                        if (arrayError) {
                            res.json(arrayError);
                            res.statusCode = HttpStatus.BAD_REQUEST;

                            return;
                        }

                        console.log("Result: ", result)
                        if(result.length==0){
                            res.json({"message":"either user does not exists or does not have any posts"});
                            res.statusCode = HttpStatus.OK;
                            return
                        }else {
                            res.json(result);
                            res.statusCode = HttpStatus.OK;
                            return
                        }

                    });
            });

            mongo.close();

        });

        router.patch('/users/:id',async (req, res) => {
            console.log(req.params.id)
            console.log(req.body)

            let userId = req.params.id;
            if(isNaN(userId) || userId.includes(".")|| userId.includes("-")){
                res.json({"message":"invalid user ID"});
                res.statusCode = HttpStatus.OK;
                return
            }

            const mongo = new MongoDb();
            await mongo.connect();
            const db = mongo.getDb("master");
            db.collection('users', (error, collection) => {
                if (error) {
                    res.json(error);
                    res.statusCode = HttpStatus.BAD_REQUEST;

                    return;
                }
                collection.findOneAndUpdate({"id": Number(userId)},{$set:req.body}, function (err, result) {
                    console.log(err)
                    if (err) {
                        res.json(err);
                        res.statusCode = HttpStatus.BAD_REQUEST;

                        return;
                    }
                    res.json({message:"User Updated"});
                    res.statusCode = HttpStatus.OK;
                    return
                })
            })
        });
    }
    // tslint:disable-next-line:prefer-function-over-method
    private mountTestRoute(router: Router): void {
        router.get('/', (req, res) => {
            res.json({
                'message': 'Hello World!',
            });
        });

        router.post('/', (req, res) => {
            res.json(req.body);
        });
    }
}