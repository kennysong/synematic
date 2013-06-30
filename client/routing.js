if (Meteor.isClient) {
  Meteor.Router.add(
    {
      '/' : 'home',
      '/about' : 'about',
      '/room/:id' : function(id) {
          Session.set('roomId', id);
          return 'room'; 
        },
      '*' : 'error'
  });
}