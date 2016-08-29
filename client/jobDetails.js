
Template.jobDetails.onCreated(function(){
	var self= this;
	self.autorun(function(){
		var id = FlowRouter.getParam('_id')
		self.subscribe('singleJob',id);
	});
});

Template.jobDetails.helpers({
	job: ()=> {
		var id = FlowRouter.getParam('_id')
		return Jobs.findOne({_id:id});
	}
});
