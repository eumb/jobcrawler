
FlowRouter.route('/', {
  name: "home",
  action: function(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "home",
      nav: "nav",
    });
  }
});

FlowRouter.route('/private', {
  name: "private",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "Jobs",
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


//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
