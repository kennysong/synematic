var S3_URL = "https://s3-us-west-2.amazonaws.com/meteor-hackathon/";
var ROOM_URL = "http://synematic.meteor.com/room/";

if (Meteor.isClient) {
  Meteor.startup(function () {
    filepicker.setKey("AKVPKuZJ1SmuwsACRbbLJz");
    Rooms.insert({id: Session.get('roomId'), paused: 1, time: 0});
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


// Template.video.rendered = function () {
//   myPlayer = videojs("example_video_1");
//   temp = Rooms.find({id: Session.get('roomId')})

//   var playEvent = function() {
//     // Rooms.update(, {$set: {"paused": 0}})
//     // console.log("play")
//   };

//   var pauseEvent = function() {
//     // Rooms.update(this._id, {$set: {"paused": 1}})
//     // console.log("pause")
//   };

//   myPlayer.on("play", playEvent);
//   myPlayer.on("pause", pauseEvent);
// };

// Deps.autorun(function () {
//   temp = Rooms.find({id: Session.get('roomId')})
//   temp.forEach(function(doc) {
//     if (doc.paused) {
//       myPlayer.pause();
//     } else {
//       myPlayer.play();
//     }
//   });
// });