exports.definition = {
	config: {
		columns: {
		    "name": "text",
		    "captured": "integer",
		    "url": "text",
		    "capturedLat": "real",
		    "capturedLon": "real"
		},
    "defaults": {
	    "name": "",
	    "captured": "0",
	    "url": "",
	    "capturedLat": "",
	    "capturedLon": ""
    },
		adapter: {
			type: "sql",
			collection_name: "fugitives"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
      initialize: function() {
        this.on('add', function(model) {
          Ti.API.info('Fugitive was added to collection: ' + model.get('name'));
        });
        this.on('remove', function(model) {
          Ti.API.info('Fugitive was removed from collection: ' + model.get('name'));
        });
      }
			// extended functions and properties go here
		});

		return Collection;
	}
};