import express from 'express';
import compression from 'compression';
import routes from './routes';
const app = express();

app.use(compression());
app.use(express.static('public'));

app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, function listenHandler() {
	console.info(`Running on ${port}...`);
});
