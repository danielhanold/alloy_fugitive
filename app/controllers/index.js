// Determine if the database has already been seeded.
// Only seed the database once.
var seeded = Ti.App.Properties.hasProperty('seeded');
Ti.API.info('seeded: ' + seeded);

// Access the existing fugitives collection.
var fugitives = Alloy.Collections.fugitives;
fugitives.fetch();

// Show the contents of each collections.
Ti.API.info(JSON.stringify(fugitives.toJSON()));
fugitives.each(function(fugitive, index) {
  Ti.API.info('fugitive #' + index + ': ' + fugitive.get('name'));

});



if (!seeded) {
  // Define yuppers names.
	var names = ["Jeff Haynie", "Nolan Wright", "Blain Hamon", "Aaron Saunders", "Anthony Decena"];

	// Loop through the names array to create a model
  // representing each and save it to the collection.
  _.each(names, function(name) {
    var fugitive = Alloy.createModel('fugitives', {
      name: name
    });
    Ti.API.info('Add fugitive: ' + name);

    // Add this fugitive to the collection.
    fugitives.add(fugitive);

    // Save this fugitive in the database.
    fugitive.save();
  });

	// set our app property so this code doesn't run next time.
  Ti.App.Properties.setString('seeded', 'yuppers');
}



$.index.open();