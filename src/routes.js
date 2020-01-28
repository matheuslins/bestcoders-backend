const { Router } = require("express");
const CoderController = require('./controllers/CoderController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/coders', CoderController.index);
routes.post('/coders', CoderController.store);

routes.get('/search', SearchController.index);

module.exports = routes
