'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
const Boom = require('boom');
var Flickr = require("node-flickr");
var keys = {"api_key": "1a2a7ce72234060bf669700fff15ccdc"};
var flickr = new Flickr(keys);
const server = new Hapi.Server({});
server.connection({ port: 3000 });
server.register(Inert, () => {});

server.route({
  method: 'GET',
  path: '/{filename*}',
  handler: {
    directory: {
      path:    './',
      listing: false,
      index:   false
    }
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply.file('public/index.html');
  }
});

//Search without limit or offset
server.route({
    method: 'GET',
    path: '/searchTerm/{tags}',
    handler: function (request, reply) {
		flickr.get("photos.search", {"tags":request.params.tags, "per_page":60}, function(err, result){
			if (err) return console.error(err);
			if (!result.photos.photo.length) {
				return reply(Boom.badImplementation('No pictures founded'));
			}
			else{
				reply(result.photos);
			}			
		});
    }
});

//Search with limit but no offset
server.route({
    method: 'GET',
    path: '/searchTerm/{tags}/{limit}',
    handler: function (request, reply) {
		flickr.get("photos.search", {"tags":request.params.tags, "per_page":request.params.limit}, function(err, result){
			if (err) return console.error(err);
			if (!result.photos.photo.length) {
				return reply(Boom.badImplementation('No pictures founded'));
			}
			else{
				reply(result.photos);
			}	
		});
    }
});

//Search with limit and offset
server.route({
    method: 'GET',
    path: '/searchTerm/{tags}/{limit}/{offset}',
    handler: function (request, reply) {
		flickr.get("photos.search", {"tags":request.params.tags, "per_page":request.params.limit, "page":request.params.offset}, function(err, result){
			if (err) return console.error(err);
			if (!result.photos.photo.length) {
				return reply(Boom.badImplementation('No pictures founded'));
			}
			else{
				reply(result.photos);
			}	
		});
    }
});

//Search using image ID number
server.route({
    method: 'GET',
    path: '/image/{id}',
    handler: function (request, reply) {
		flickr.get("photos.getInfo", {"photo_id":request.params.id}, function(err, result){
			if (err) return console.error(err);
			reply(result);
		});
    }
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});