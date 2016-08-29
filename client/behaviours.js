
Template.nav.helpers(function(){

$(function (){
	$('a.item').click(function(){
		$('item').removeClass('active');
		$(this).addClass('active');
	})
});
	
});

/*
Template.JobList.helpers(function(){

$(function (){
	$('ui.toggleisApplied').click(function(){
		$('item').removeClass('active');
		$(this).addClass('active');
	})
});
	
});

*/

Template.myAccount.onRendered(function(){
  $('#hybrid select').dropdown({on: 'hover'});
});


	