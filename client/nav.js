Template.nav.helpers({
	userInfo: function () {
		//return Meteor.user().emails[0].address;
		//console.log(Meteor.user())
			return Meteor.user().profile.firstName;
	},
	userRole:function(){
			return Meteor.user().profile.role;
	}
});
