if (Meteor.isClient) {
  Router.route('/', function () {
    this.render('home');
  });

  Router.route('/about', function () {
    this.render('about');
  });

  Router.route('/faq', function () {
    this.render('faq');
  });

  Router.route('/room/:_id', function () {
    var id = this.params._id;
    Session.set('roomId', id); 
    return 'room'; 
  })
}
