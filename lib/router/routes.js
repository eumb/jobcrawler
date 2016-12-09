//if not loged in than go to homepage

/*FlowRouter.triggers.enter([function(context,redirect){
	
	if(!Meteor.userId()){
		
		FlowRouter.go('defaultPage');
		
	}
	
}]);
*/

//Allows 

if (Meteor.isClient){
	
	Accounts.onLogin(function(){
	
		FlowRouter.go('home');	
		
	});
	
	Accounts.onLogout(function(){
	
		FlowRouter.go('defaultPage');
		
	});
	
	
}






FlowRouter.route('/logedIn', {
  name: "logedIn",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    GAnalytics.pageview();
    
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "JobList",
      nav: "nav",
      sidebar:"sideNav",
    });
  }
});


FlowRouter.route('/', {
  name: "home",
    action: function(params, queryParams) {
    if(Meteor.userId()){
    	FlowRouter.go('logedIn');
    }

    GAnalytics.pageview();
    BlazeLayout.render('defaultPage', {
      footer: "footer",
      main: "home",
      nav: "nav",
    
    });
  }
});

FlowRouter.route('/addJob', {
  name: "addJob",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "basic",
      nav: "nav",
     
    });
  }
});


FlowRouter.route('/addJobContact', {
  name: "addJobContact",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "addJobContact",
      nav: "nav",

    });
  }
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "pageNotFound",
      nav: "nav",
    });
  }
};

FlowRouter.route('/jobDetails/:_id',{
  name: "jobDetails",

  action: function(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "jobDetails",
      nav: "nav",
    });
  }
});

FlowRouter.route('/signIn', {
  name: "signIn",

  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "signInPage",
      nav: "nav",
    });
  }
});

FlowRouter.route('/signUp', {
  name: "signUp",

  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "signUpPage",
      nav: "nav",
    });
  }
});

FlowRouter.route('/account',{
	name:"account",
	action:function(params,queryParams){
		BlazeLayout.render('masterLayout',{
			footer:"footer",
			main:"accounts",
			nav:"nav",
			sidebar:"sideNav",
		});
	}
});

FlowRouter.route('/enrolled',{
	name:"enrolled",
	action:function(params,queryParams){
		BlazeLayout.render('masterLayout',{
			footer:"footer",
			main:"enrolledList",
			nav:"nav",
			sidebar:"sideNav",
		});
	}
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');