Template.JobList.events({
	'click .toggleisApplied':function(){
		Meteor.call('toggleJobApplyedStatus',this._id,this.isApplyed)
	}
	
});