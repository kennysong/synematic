if (Meteor.isClient) {
  Meteor.Router.add({
    '/': 'roomPage',
  })
  
  Template.content.helpers({
    layoutName: function() {
      switch (Meteor.Router.page()) {
        case 'roomPage':
          return 'roomLayout';
        default:
          return 'roomLayout';
      }
    }
  });
}