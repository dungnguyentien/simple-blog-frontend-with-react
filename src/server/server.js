import express from 'express';
import compression from 'compression';
import routes from './routes';

//
import renderServerSideContent from './middleware/renderServerSideContent';

//
const app = express();

app.use(compression());
app.use(express.static('public'));

app.use('/', [renderServerSideContent], routes);

const port = process.env.PORT || 3000;

app.listen(port, function listenHandler() {
	console.info(`Running on ${port}...`);
});
