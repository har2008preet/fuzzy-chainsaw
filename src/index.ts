import { App } from './app';

const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;

const app = new App().express;

app.listen(port, err => {
    if (err) {
      return console.error(err);
    }

    return console.info(`server is listening on ${port}`);
});