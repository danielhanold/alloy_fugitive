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
			// extended functions and properties go here
		});

		return Collection;
	}
};