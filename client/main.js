var S3_URL = "https://s3-us-west-2.amazonaws.com/meteor-hackathon/";
var ROOM_URL = "http://synematic.meteor.com/room/";

if (Meteor.isClient) {
  Meteor.startup(function () {
    filepicker.setKey("AKVPKuZJ1SmuwsACRbbLJz");
    Rooms.insert({id: Session.get('roomId'), paused: 1, time: 0});
  }); 

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

  Template.chat.created = function () {
    // Initialize API key, session, and token...
    // Think of a session as a room, and a token as the key to get in to the room
    // Sessions and tokens are generated on your server and passed down to the client
    var apiKey = "33715012";
    var sessionId = "1_MX4zMzcxNTAxMn4xMjcuMC4wLjF-U2F0IEp1biAyOSAxODo0NDoxMCBQRFQgMjAxM34wLjYzNzI5MDY2fg";
    var token = "T1==cGFydG5lcl9pZD0zMzcxNTAxMiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz0zZDY1MWU4MDkxNWVjZDgyN2QzZmMwZGI0MTBhYmQ1OTBjYjgyMDEzOnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9JmNyZWF0ZV90aW1lPTEzNzI1NTY2NTAmbm9uY2U9MC43MTk0MDYyMjUwNzc3NTIxJmV4cGlyZV90aW1lPTEzNzI2NDMwNTAmY29ubmVjdGlvbl9kYXRhPQ==";
    var VIDEO_WIDTH = 200
    var VIDEO_HEIGHT = 160

    // Initialize session, set up event listeners, and connect
    var session = TB.initSession(sessionId);
    session.connect(apiKey, token);

    function sessionConnectedHandler (event) {
      subscribeToStreams(event.streams);
      var div = document.createElement('div');
      div.setAttribute('id', 'publisher');
      document.body.appendChild(div);
      var publisherProps = {width: VIDEO_WIDTH, height: VIDEO_HEIGHT};
      publisher = TB.initPublisher(apiKey, 'publisher', publisherProps);
      session.publish(publisher);
    }

    function subscribeToStreams(streams) {
      for (var i = 0; i < streams.length; i++) {
        // Make sure we don't subscribe to ourself
        if (streams[i].connection.connectionId == session.connection.connectionId) {
          return;
        }
          
        var subscriberProps = {width: VIDEO_WIDTH, height: VIDEO_HEIGHT};
        
        // Create the div to put the subscriber element in to
        var div = document.createElement('div');
        div.setAttribute('id', 'stream' + streams[i].streamId);
        document.body.appendChild(div);


        // Subscribe to the stream
        session.subscribe(streams[i], div.id, subscriberProps);
      }
    }

    function streamCreatedHandler(event) {
      subscribeToStreams(event.streams);
    }

    session.addEventListener('sessionConnected', sessionConnectedHandler);
    session.addEventListener("streamCreated", streamCreatedHandler);
  };

  // Template.room.created = function() {
  //   // Initialize API key, session, and token...
  //   // Think of a session as a room, and a token as the key to get in to the room
  //   // Sessions and tokens are generated on your server and passed down to the client
  //   var apiKey = "1127";
  //   var sessionId = "2_MX4xMTI3fn5TdW4gSnVuIDMwIDA1OjUzOjMxIFBEVCAyMDEzfjAuNDUyNDQ3NH4";
  //   var token = "T1==cGFydG5lcl9pZD0xMTI3JnNpZz00ZGU4ODFkMzg0Zjk0NDI4NjIwNDMxOWE5OTAyYjU1NWE3ZGMzZGIwOnNlc3Npb25faWQ9Ml9NWDR4TVRJM2ZuNVRkVzRnU25WdUlETXdJREExT2pVek9qTXhJRkJFVkNBeU1ERXpmakF1TkRVeU5EUTNOSDQmY3JlYXRlX3RpbWU9MTM3MjU5NjgxMSZub25jZT0xNTEyMCZyb2xlPXB1Ymxpc2hlcg==";

  //   // Enable console logs for debugging
  //   TB.setLogLevel(TB.DEBUG);

  //   // Initialize session, set up event listeners, and connect
  //   var session = TB.initSession(sessionId);
  //   session.addEventListener('sessionConnected', sessionConnectedHandler);
  //   session.addEventListener('streamCreated', streamCreatedHandler);
  //   session.connect(apiKey, token);
  //   function sessionConnectedHandler(event) {
  //     var publisher = TB.initPublisher(apiKey, 'myPublisherDiv');
  //     session.publish(publisher);

  //     // Subscribe to streams that were in the session when we connected
  //     subscribeToStreams(event.streams);
  //   }

  //   function streamCreatedHandler(event) {
  //     // Subscribe to any new streams that are created
  //     subscribeToStreams(event.streams);
  //   }

  //   function subscribeToStreams(streams) {
  //     for (var i = 0; i < streams.length; i++) {
  //       // Make sure we don't subscribe to ourself
  //       if (streams[i].connection.connectionId == session.connection.connectionId) {
  //         return;
  //       }

  //       // Create the div to put the subscriber element in to
  //       var div = document.createElement('div');
  //       div.setAttribute('id', 'stream' + streams[i].streamId);
  //       document.body.appendChild(div);

  //       // Subscribe to the stream
  //       session.subscribe(streams[i], div.id);
  //     }
  //   }
  // };

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
    Template.video.rendered=function() {

       myPlayer = videojs("example_video_1");
     
  
   var playEvent = function() {
       Meteor.http.post("meteor-synematic.appspot.com/update?pause=0")
       
   };

   var pauseEvent = function() {
       Meteor.http.post("meteor-synematic.appspot.com/update?pause=1")
   };

   myPlayer.on("play", playEvent);
   myPlayer.on("pause", pauseEvent);
 };


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