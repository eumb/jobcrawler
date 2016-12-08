Template.JobList.events({
	'click .toggleisApplied':function(){
		Meteor.call('toggleJobApplyedStatus',this._id,this.isApplyed)
	}
	
});

/*Template.JobList.helpers({
	textValue: function() {
		return 
    if (this.en) {
      return this.text.tc;
    } else if (this.tc) {
      return this.text.tc;
    }
  }
});*/