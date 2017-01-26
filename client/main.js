


Template.body.events({
    'click .logout': function(event){
        event.preventDefault();
        AccountsTemplates.logout();
        FlowRouter.go('home');
    }
});


//
Template.body.rendered = function () {
 /* $(window).on('beforeunload', function () {
    // You can either remove the login tokens manually from localstorage like this:
    // localStorage.removeItem(key);

    // Alternatively you should be able to log out Meteor here (not tested), eg:
    Meteor.logout();
  });*/
};


Template.myAtForm.replaces("atForm");


  codeAddress = function(address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        callback(results[0].geometry.location);
      } else {
        callback(0);
      }
    });
}


