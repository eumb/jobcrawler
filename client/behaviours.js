Template.accounts.onRendered(function(){
  $('#hybrid select').dropdown({on: 'hover'});
});

Template.JobList.onRendered(function(){
 // $('.special.cards').dimmer({on: 'hover'});

 $('#category').append('<p>Loading image</p>');

/*  $("#category").text("test");
  alert($("#category").text());
  console.log("Joblist loaded");*/
});

Template.nav.onRendered (function () {
  /*this.$('.sidebar.menu').sidebar('attach events', '.action-toggle-sidebar') */
  this.$(".item").click(function() {
  	//console.log("we are here");
	$('.item').removeClass('active');
    	$(this).addClass('active');
    });
  
  this.$('#m_btn').on('click',function(){
    $('#m_menu').sidebar('toggle');
  });
});


/*Template.masterLayout.created = function() {
	$('body').delegate('.dropdown', 'click', function(event) {
    	$('.dropdown').dropdown();
  	});
	$('.ui .item').on('click', function() {
    	$('.ui .item').removeClass('active');
    	$(this).addClass('active');
    }); 
};*/


Meteor._reload.onMigrate(function() {
  return [false];
});