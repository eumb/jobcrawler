//Meteor.subscribe('jobs');

Template.home.onCreated(function(){
	var self= this;
	self.autorun(function(){
		self.subscribe('jobs');
	});
});

Template.home.helpers({
	jobs: ()=> {
		return Jobs.find({});
	}
});
