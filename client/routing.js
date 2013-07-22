Meteor.Router.add(
  {
    '/' : 'home',
    '/about' : 'about',
    '/faq' : 'faq',
    '/r/:id' : function(id) {
        Session.set('room_id', id);
        return 'room'; 
      },
    '*' : 'error'
});