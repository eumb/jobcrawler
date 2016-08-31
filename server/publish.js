
Meteor.publish('jobs',function(){
		return Jobs.find();
});


Meteor.publish('singleJob',function(id){
	check(id,String);
	return Jobs.find({_id:id});
});



//publishes the enrolled jobs only
Meteor.publish('enrolledJobs',function(){
		return Jobs.find({purchasedBy:this.userId});
});
