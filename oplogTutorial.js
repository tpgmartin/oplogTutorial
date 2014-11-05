if (Meteor.isServer) {
  Meteor.publish("playerData", function() {
    return Players.find();
  });

  // Set which users can see server metrics
  Facts.setUserIdFilter(function () {
    return true;
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("playerData");

  // Pass query results to the "players" template
  Template.players.scorers = function () {
    return Players.find();
  };

  // Grab user input fields
  Template.form.events({
    'submit form' : function (event, template) {
      var name = template.find("input[name=name]").value;
      var score = template.find("input[name=score]").value;
    
      // Do inputs validation

      // Insert into database
      var data = { name: name, score: score };
      Players.insert(data, function(err) {
        if(err) throw err;
      });
    }
  });
}