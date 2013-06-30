if (Meteor.isClient) {
  Meteor.Router.add(
    {
      '/' : 'home',
      '/about' : 'about',
      '/faq' : 'faq',
      '/room/:id' : function(id) {
          Session.set('roomId', id);
          return 'room'; 
        },
      '*' : 'error'
  });
}