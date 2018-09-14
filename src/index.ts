import App from './server';

class Index {
	private PORT: Number = 8082;
	constructor() {
		console.log(`Now browse to http://localhost:${this.PORT}/playground`);
		console.log(`Now browse to http://localhost:${this.PORT}/graphiql`);
		console.log(`Now browse to http://localhost:${this.PORT}/voyager`);
	}

	start() {
		App.listen(this.PORT, () => App.settings.port = this.PORT);
	}
}

new Index().start();