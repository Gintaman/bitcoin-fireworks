const express = require('express'),
	app = express(),
	path = require('path');

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(8080, () => console.log('Server started on 8080'));
