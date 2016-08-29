//Meteor.subscribe('jobs');
//subscribes to the list of enrolled jobs

Meteor.subscribe('jobs');

Template.enrolledList.onCreated(function(){
	Meteor.subscribe('enrolledJobs');
	
});

Template.enrolledList.helpers({
	enrolledJobs: ()=> {
		return Jobs.find({isApplyed:true});
	}
});


Template.enrolledList.events({
	'click .toggleisApplied':function(){
		Meteor.call('toggleJobApplyedStatus',this._id,this.isApplyed)
	}
	
});