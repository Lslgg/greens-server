import App from './server';

class Index {
	private PORT: Number = 8081;
	constructor() {
		console.log('Now browse to http://localhost:8081/playground');
		console.log('Now browse to http://localhost:8081/graphiql');
		console.log('Now browse to http://localhost:8081/voyager');
	}

	start() {
		App.listen(this.PORT, () => App.settings.port = this.PORT);
	}
}

new Index().start();