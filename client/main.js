var S3_URL = "https://s3-us-west-2.amazonaws.com/meteor-hackathon/";


if (Meteor.isClient) {
  Meteor.startup(function () {
    filepicker.setKey("AKVPKuZJ1SmuwsACRbbLJz");
  }); 

  // Template.hello.greeting = function () {
  //   return "Welcome to synematic.";
  // };


  // upload handler
  Template.upload.events({
    'click #attachment' : function () {
      filepicker.pickAndStore({},
          {location:"S3"}, function(InkBlobs){
            var key = InkBlobs[0]['key'];
            var url = S3_URL + key;
            console.log(JSON.stringify(url));
      });
    }
  });

  Template.room.helpers({
    roomId: function() {return Session.get('roomId'); }
  }); 

  Template.home.events({
    'focus #nameroom':function() {
      if (!$('#stepone').hasClass('stepactive')){
        $('#stepone').addClass('stepactive')
      }
    },
    'blur #nameroom': function() {
      $('#stepone').removeClass('stepactive')
    }
  })

}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
