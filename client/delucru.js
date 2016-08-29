//Meteor.subscribe('jobs');
//By default, BlazeLayout render layouts into a DOM element with the id __blaze-root. Sometimes, you may need to change it or just render layouts into the body. If so, here's how to do it.

//Add following code inside on the top of one of your client side JS file:

BlazeLayout.setRoot('body');



Template.JobList.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('jobs');
	});
});

Template.JobList.helpers({
	jobs: () => {
		return Jobs.find({isApplyed:false});
	}
});

/*
Template.home.onCreated(function(){
	Meteor.subscribe('jobs');

});
Template.home.helpers({
	jobs: ()=> {
		return Jobs.find({});
}
});*/