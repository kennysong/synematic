var S3_URL = "https://s3-us-west-2.amazonaws.com/meteor-hackathon/";
var ROOM_URL = "http://synematic.meteor.com/room/";



Meteor.startup(function () {
  filepicker.setKey("AKVPKuZJ1SmuwsACRbbLJz");
  Session.set('prev_time', 0.0)
  // Rooms.insert({id: Session.get('room_id'), paused: 1, time: 0});
});

/** Home Page Slider Handler **/
Template.home.events({

  // First step (name room) -> Second step (upload)
  'click #submitroom':function() {
    $('#steptwo').addClass('stepactive');
    $('#create').animate({"left": "-=350px", "opacity":0}, '2000', 'linear', function(){$('#create').css({'visibility':'hidden'})});
    $('#uploading').css({'visibility':'visible'});
    $('#uploading').animate({"left": "-=297px", "opacity":1}, '2000', 'linear');

    var room_id = encodeURIComponent($('#nameroom').val());
    var url = ROOM_URL + room_id;
    $('#url').val(url);
  },

  // First step focus/blur handlers
  'focus #nameroom':function() {
    if (!$('#stepone').hasClass('stepactive')) {
      $('#stepone').addClass('stepactive')
    }
  },

  'blur #nameroom': function() {
    $('#stepone').removeClass('stepactive')
  },

  // upload/filepicker handler
  'click #attachment' : function () {
    if (!$('#attachment').hasClass('disabled')) {
      filepicker.pickAndStore({}, {location:"S3"}, function(InkBlobs){
        var key = InkBlobs[0]['key'];
        var url = S3_URL + key;
        console.log(JSON.stringify(url));
        $('#uploadnotif').css({'visibility':'visible'});
        $('#attachment').text('Success!');
        $('#attachment').addClass('disabled');
      });
    }
  },

  // Step two (done upload) -> Step three (user copy link)
  'click #afterupload':function() {
    $('#steptwo').removeClass('stepactive');
    $('#stepthree').addClass('stepactive');
    $('#uploading').animate({"left": "-=350px", "opacity":0}, '2000', 'linear', function(){$('#uploading').css({'visibility':'hidden'})});
    $('#share').css({'visibility':'visible'});
    $('#share').animate({"left": "-=532px", "opacity":1}, '2000', 'linear');
  }

});

Template.room.helpers({
  room_id: function() {return Session.get('room_id'); }
});

Template.video.rendered = function() {
  projekktor('#room_video');       
  var player = projekktor('room_video')

  var room_id = Session.get('room_id');
  var last_sync_time = 0.0;
  Meteor.subscribe('rooms', room_id)

  Meteor.call("get_room", room_id, function(error, room) {
    if (error) {
      console.log(error)
    } else {
      Session.set('mongo_id', room['_id'])
    }
  });

  var playEvent = function() {
    console.log('play')
    var room = Rooms.findOne({'room_id':Session.get('room_id')});
  };

  var pauseEvent = function() {
    console.log('pause')
    var room = Rooms.findOne({'room_id':Session.get('room_id')});
  };

  // var timeupdateEvent = function () {
  //   // console.log('timeupdate')
  //   // check if seeked locally    
  //   var prev_time = Session.get('prev_time')
  //   var current_time = myPlayer.currentTime()
  //   if (Math.abs(prev_time - current_time) > 1.0) {
  //     // update database
  //     console.log('seek')
  //     console.log(Math.abs(prev_time - current_time))
  //     console.log(prev_time)
  //     console.log(current_time)
  //     var room = Rooms.findOne({'room_id':Session.get('room_id')});
  //     Rooms.update(room._id,{$set:{'time':current_time}});
  //   }
  //   Session.set('prev_time', current_time);

  // };

  function stateEvent(data) {
    var room = Rooms.findOne({'room_id':Session.get('room_id')});

    if (data == 'PAUSED') {
      console.log('pause')
      Rooms.update(room._id,{$set:{"paused":1}});    
    } else if (data == 'PLAYING') {
      console.log('play')
      Rooms.update(room._id,{$set:{'paused':0}});
    }
  }

  function seekEvent(data) {
    if (data == 'SEEKED') {
      console.log(player.getPosition())
    }
  }

  player.addListener('state', stateEvent);
  player.addListener('seek', seekEvent);

  Deps.autorun(function() {
    console.log('aaaa')
    var room = Rooms.findOne({'room_id':Session.get('room_id')});
    console.log(room)
    if (room) {
      // play/pause syncing
      if ((player.getState("PAUSED") || player.getState("IDLE"))&& !room.paused) {
        player.setPlay();
        console.log('sync played');
      } else if (player.getState("PLAYING")  && room.paused) {
        player.setPause();
        console.log('sync paused');
      }

      // time syncing
      // if (last_sync_time != room['time']) {
      //   myPlayer.currentTime(room['time']);
      // }

    }
  });
}

// Template.video.rendered = function() {
//   myPlayer = videojs("room_video");     
//   var room = Rooms.findOne({"id": Session.get("room_id")});
//   var playEvent = function() {
//     Rooms.update(room._id,{$set:{"paused":0}});      
//   };

//   var pauseEvent = function() {
//     Rooms.update(room._id,{$set:{'paused':1}});
//   };

//   myPlayer.on("play", playEvent);
//   myPlayer.on("pause", pauseEvent);

//   Meteor.startup(function () {
//     Deps.autorun ( function () {
//       var room = Rooms.findOne({"id": Session.get("room_id")});
//       console.log("room is ", room);
//       console.log(Session.get("room_id"))

//       if (!document.getElementById('room_video')) {
//         return;
//       }

//       myPlayer = videojs("room_video");  

//       if(handle.ready()) {	 
//         var room = Rooms.findOne({"id": Session.get("room_id")});
//         console.log(room)
//       } else {
//     	 return ;
//       }
      
//       if (room==undefined) {
//         Rooms.insert({"id": Session.get("room_id"),"paused":1})
//       }
    	 
//       room = Rooms.findOne({"id": Session.get("room_id")});
//       console.log(room)
         
//       if (room.paused && !myPlayer.paused()) {
//         myPlayer.pause();
//       }

//       if (!room.paused && myPlayer.paused()) {
//         myPlayer.play();
//       }

//     });
//   }
  // );
// };
