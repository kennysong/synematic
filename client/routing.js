if (Meteor.isClient) {
  Meteor.Router.add({
    '/': 'roomPage',
    '/upload': 'uploadPage'
  })
  
  Template.body.helpers({
    layoutName: function() {
      switch (Meteor.Router.page()) {
        case 'roomPage':
          return 'roomLayout';
        case 'uploadPage':
          return 'uploadLayout';
        default:
          return 'roomLayout';
      }
    }
  });
}