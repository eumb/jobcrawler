
Meteor.startup(function() {  
  /*GoogleMaps.load({ v: '3', key: 'AIzaSyCOronufACD2bgiBIhOZBGETSsn78xXgkk', libraries: 'geometry,places' });*/
  GoogleMaps.load({
    key: 'AIzaSyCOronufACD2bgiBIhOZBGETSsn78xXgkk',
    libraries: 'places'  // also accepts an array if you need more than one
  }); 
});

Template.jobDetails.onRendered(function() {
  this.autorun(function () {
    
    //initializr map wiht parameters
    if (GoogleMaps.loaded()         ) {
      /* $("#input").geocomplete();*/
       console.log("setting canvas map")
       $('#address').geocomplete({
           map: "#map_canvas",
           details: ".details",
           detailsAttribute: "data-geo",
           markerOptions: {
            draggable: true
           },  

      });
      //get location data from the field (job.location) 
      var address1=$('#address').html();
      console.log(address1); 
      //call find method for the address
      $("#address").geocomplete("find", address1);
      // Get the map and set a new zoom level.
      var map = $("#address").geocomplete("map");
      map.setZoom(3);
    }

  });
});

/*Template.jobDetails.events({
  'click #find': function() {
    // Trigger geocoding request.
    console.log("geocoding event");
    $('#input').trigger("geocode");
    
   }
});
*/
Template.jobDetails.onCreated(function(){
	var self= this;
	self.autorun(function(){
		var id = FlowRouter.getParam('_id')
		self.subscribe('singleJob',id);
	});
  GoogleMaps.ready('map', function(map) {
     console.log("I'm ready!");
  });
 /* var id = FlowRouter.getParam('_id');
  var address = Jobs.findOne({_id:id}); //returns only _id adn category of all objects*/
  //console.log(id);
  //console.log(address.location);

});

Template.jobDetails.helpers({
	job: ()=> {
		var id = FlowRouter.getParam('_id')
		return Jobs.findOne({_id:id});
	},
/*	mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(45.766127, 21.260896),
        zoom: 15
      };
    }
  },*/

/*  getlocation:function(){

  	codeAddress("3100 East Fletcher Avenue, Tampa, FL, United States", function (result) {
    	console.log(result.toString());
  	});
  }*/

});