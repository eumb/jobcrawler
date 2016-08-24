Meteor.publish('jobs',function(){
		return Jobs.find({author: this.userId});
});


Meteor.publish('singleJob',function(id){
	check(id,String);
	return Jobs.find({_id:id});
});
