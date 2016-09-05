Template.myAccount.onRendered(function(){
  $('#hybrid select').dropdown({on: 'hover'});
});

Template.JobList.onRendered(function(){
$('.special.cards').dimmer({on: 'hover'});
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