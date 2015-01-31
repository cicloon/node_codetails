var app = require('./app'),
    homeController = require('./controller11')(app);

app.get('/', homeController.index );
