var app = require('./app'),    
    homeController = require('./controller10')(app);

app.get('/', homeController.index );
