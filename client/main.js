var S3_URL = "https://s3-us-west-2.amazonaws.com/meteor-hackathon/";
var ROOM_URL = "http://synematic.meteor.com/room/";

if (Meteor.isClient) {
  Meteor.startup(function () {
    filepicker.setKey("AKVPKuZJ1SmuwsACRbbLJz");
  }); 

  // Template.hello.greeting = function () {
  //   return "Welcome to synematic.";
  // };


  // upload handler
  Template.home.events({
    'click #attachment' : function () {
      if (!$('#attachment').hasClass('disabled')) {
        filepicker.pickAndStore({},
          {location:"S3"}, function(InkBlobs){
            var key = InkBlobs[0]['key'];
            var url = S3_URL + key;
            console.log(JSON.stringify(url));
            $('#uploadnotif').css({'visibility':'visible'});
            $('#attachment').text('Success!');
            $('#attachment').addClass('disabled');
       });
      }
    }
  });

  Template.room.helpers({
    roomId: function() {return Session.get('roomId'); }
  }); 

  Template.home.events({
    'click #submitroom':function() {
      $('#steptwo').addClass('stepactive');
      $('#create').animate({"left": "-=350px", "opacity":0}, '2000', 'linear', function(){$('#create').css({'visibility':'hidden'})});
      $('#uploading').css({'visibility':'visible'});
      $('#uploading').animate({"left": "-=297px", "opacity":1}, '2000', 'linear');

      var roomId = encodeURIComponent($('#nameroom').val());
      var url = ROOM_URL + roomId;
      $('#url').val(url);
    },

    'click #afterupload':function() {
      $('#steptwo').removeClass('stepactive');
      $('#stepthree').addClass('stepactive');
      $('#uploading').animate({"left": "-=350px", "opacity":0}, '2000', 'linear', function(){$('#uploading').css({'visibility':'hidden'})});
      $('#share').css({'visibility':'visible'});
      $('#share').animate({"left": "-=532px", "opacity":1}, '2000', 'linear');

    },


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
