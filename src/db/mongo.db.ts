import { Db, MongoClient } from 'mongodb';

/**
 * Class to connect with mongo and get the todo db
 *
 * @export
 */
export class MongoDb {
    private client: MongoClient;
    private readonly connectionString = 'mongodb://localhost:27017';
    private readonly dbName ='master';

    /**
     * closes the connection with mongo client
     *
     */
    public close() {
        if (this.client) {
            this.client.close()
            .then()
            .catch(error => {
                console.error(error);
            });
        } else {
            console.error('close: client is undefined');
        }
    }

    /**
     * connects to mongo client
     *
     */
    public async connect() {
        try {
            if (!this.client) {
                console.info(`Connectiong to ${this.connectionString}`);
                this.client = await MongoClient.connect(this.connectionString, {'useNewUrlParser': true});
            }
        } catch(error) {
            console.error(error);
        }
    }

    /**
     * gets the todo db from mongo
     *
     */
    public getDb(s: string): Db {
        if (this.client) {
            console.info(`getting db ${s}`);

            return this.client.db(s);
        } else {
            console.error('no db found');

            return undefined;
        }
    }
}