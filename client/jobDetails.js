
Meteor.startup(function() {  
  //GoogleMaps.load({ v: '3', key: 'AIzaSyCOronufACD2bgiBIhOZBGETSsn78xXgkk', libraries: 'geometry,places' });
  GoogleMaps.load({
    key: 'AIzaSyCOronufACD2bgiBIhOZBGETSsn78xXgkk',
    libraries: 'places'  // also accepts an array if you need more than one
  });	
});


Template.myTemplate.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("input").geocomplete();
    }
  });
})

Template.jobDetails.onCreated(function(){
	var self= this;
	self.autorun(function(){
		var id = FlowRouter.getParam('_id')
		self.subscribe('singleJob',id);
	});

  GoogleMaps.ready('map', function(map) {
     console.log("I'm ready!");
  });

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
        zoom: 8
      };
    }
  },*/

/*  getlocation:function(){

  	codeAddress("3100 East Fletcher Avenue, Tampa, FL, United States", function (result) {
    	console.log(result.toString());
  	});
  }*/

});