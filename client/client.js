var S3_URL = "https://s3-us-west-2.amazonaws.com/meteor-hackathon/";

Meteor.startup(function () {
  filepicker.setKey("AKVPKuZJ1SmuwsACRbbLJz");
  Rooms.insert({id: Session.get('roomId'), paused: 1, time: 0});
});

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