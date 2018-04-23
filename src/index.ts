import App from './server';
var PORT=8090;
var server=App.listen(PORT, function () {
	console.log('Now browse to http://localhost:8090/playground');
	console.log('Now browse to http://localhost:8090/graphiql');
	console.log('Now browse to http://localhost:8090/voyager');	
	App.settings.port=PORT;
});

