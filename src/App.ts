import * as bodyParser from 'body-parser';
import * as express from 'express';
// tslint:disable-next-line:no-implicit-dependencies
import { Router } from 'express-serve-static-core';

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

        this.express.use('/', router);
    }

    /**
     * tmp routes for connection testing purposes
     *
     */
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