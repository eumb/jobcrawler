
Template.accounts.helpers({
	userInformation: function () {
		//return Meteor.user().emails[0].address;
		//console.log(Meteor.user())
			return Meteor.user().profile.name;
	}
	
});
