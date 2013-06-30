if (Meteor.isClient) {
  Meteor.Router.add({
    '/': 'home',
    '/about' : 'about',
    '/room/:id' : function(id) {
        alert(id)
        return 'room'
    }

  })
  
  Template.content.helpers({
    layoutName: function() {
      switch (Meteor.Router.page()) {
        case 'home':
          return 'homeLayout';
        case 'about':
          return 'aboutLayout';
        case 'room':
          return 'roomLayout'
        default:
          return 'homeLayout';
      }
    }
  });
}