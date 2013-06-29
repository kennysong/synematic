if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to synematic.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Template.video.rendered = function () {
      jwplayer('my-video').setup({
            file: 'https://s3-us-west-2.amazonaws.com/tinymovieroom/CHLv53tSDeXPavhuCAXH_Daft+Punk+-+Get+Lucky+__+George+Barnett+cover.mp4',
            width: '640',
            height: '360'
          });
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
