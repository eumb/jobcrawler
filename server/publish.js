/*
Meteor.publish('jobs',function(){
		return Jobs.find();
});
*/

Meteor.publish('singleJob',function(id){
	check(id,String);
	return Jobs.find({_id:id});
});



//publishes the enrolled jobs only
Meteor.publish('enrolledJobs',function(){
		console.log(this.userId);
		return Jobs.find({purchasedBy:this.userId});
});




Meteor.publish('search', function(query) {  
  check(query, String); 
/*
  if (_.isEmpty(query))
    return this.ready();*/

  return Jobs.search(query);
});

Meteor.publish('filter', function(query) {  
  check(query, String); 
/*
  if (_.isEmpty(query))
    return this.ready();*/

  return Jobs.filter(query);
});

Meteor.publish('categories',function(){
	return Categories.find({});
});

