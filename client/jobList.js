BlazeLayout.setRoot('body');

Template.JobList.onCreated(function() {
  
  var self = this;
  Session.set("searchValue", "^[a-z]");
  Session.set("filterValue", "^[a-z]");
  self.autorun(function() {
    self.subscribe('search');
  });

});


Template.JobList.onRendered(function() {

  /*Session.set("searchValue", " ");
  Session.set("filterValue", "")
*/

});


Template.JobList.events({ 
	'click .toggleisApplied':function(){
		Meteor.call('toggleJobApplyedStatus',this._id,this.isApplyed);
/**/
	},

  "keyup #searchValue": _.throttle(function (e) {
      e.preventDefault();
      //Session.set("filterValue", "");
      delete Session.keys['filterValue'];
      Session.set("searchValue", $("#searchValue").val());

    },200),


   'change #filters': function(event) {
     var x = event.target.value;
      //Session.set("searchValue","");
      delete Session.keys['searchValue'];
      Session.set("filterValue", x);
      console.log(Session.get("filterValue"));
   },
   
   'click #viewDetails':function(){
   		console.log("View details");
		FlowRouter.go('/jobDetails/{{_id}}');
	},


});


Template.JobList.helpers({

  jobs: function() {
    Meteor.subscribe("filter", Session.get("filterValue"));
    Meteor.subscribe("search", Session.get("searchValue"));
    if (Session.get("filterValue")){
      console.log("filter for " + Session.get("filterValue"));
      return Jobs.filter(Session.get("filterValue"));
    }
    else if (Session.get("searchValue")) {
     
      /*return Jobs.find({isApplyed:false}, { sort: [["score", "desc"]] }).fetch();*/
      return Jobs.search(Session.get("searchValue"));
    }
    else {
      return Jobs.find({isApplyed:false}).fetch();
    }
  },

	categoryIs: function(){
		
		var categ = Jobs.findOne({_id:this._id},{fields:{'category':1}}); //returns only _id and category of all objects
		//console.log(categ);

		if (categ.category === "bathroom")
			return "bathroom"
		if (categ.category === "builder")
			return "builder"
		else if (categ.category === "bricklayer")
			return "bricklayer"
	},
	categories: function(){
		
		var categs = Jobs.find({_id:this._id},{fields:{'category':1}}); //returns only _id adn category of all objects
		console.log(categs.category);
		return categs;
	},
	userRole:function(){
			return Meteor.user().profile.role;
	}




});
