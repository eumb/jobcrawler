Template.body.events({
    'click .logout': function(event){
        event.preventDefault();
        AccountsTemplates.logout();
        FlowRouter.go('home');
    }
});