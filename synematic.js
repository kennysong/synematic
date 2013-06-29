var S3_URL = "https://s3-us-west-2.amazonaws.com/meteor-hackathon/";


if (Meteor.isClient) {
  Meteor.startup(function () {
    filepicker.setKey("AKVPKuZJ1SmuwsACRbbLJz");
  }); 

  Template.hello.greeting = function () {
    return "Welcome to synematic.";
  };

  Template.hello.events({
    'click #button' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  // upload handler
  Template.hello.events({
    'click #attachment' : function () {
      filepicker.pickAndStore({},
          {location:"S3"}, function(InkBlobs){
            var key = InkBlobs[0]['key'];
            var url = S3_URL + key;
            console.log(JSON.stringify(url));
      });
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
