  
//import SimpleSchema from 'simpl-schema';
if (Meteor.isServer){
    Meteor.methods({
        "userExists": function(username){
            return !!Meteor.users.findOne({username: username});
        },
    });
}

// Options
AccountsTemplates.configure({
  defaultLayout: 'masterLayout',

  defaultLayoutRegions: {
    nav: 'nav',
    footer: 'footer',
  },
  defaultContentRegion: 'main',
  showForgotPasswordLink: true,
  overrideLoginErrors: true,
  enablePasswordChange: true,

  // sendVerificationEmail: true,
  // enforceEmailVerification: true,
  //confirmPassword: true,
  //continuousValidation: false,
  //displayFormLabels: true,
  //forbidClientAccountCreation: true,
  //formValidationFeedback: true,
  //homeRoutePath: '/',
  //showAddRemoveServices: false,
  //showPlaceholders: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: true,

  // Privacy Policy and Terms of Use
  //privacyUrl: 'privacy',
  //termsUrl: 'terms-of-use',
});


AccountsTemplates.addField({
    _id: 'firstName',
    type: 'text',
    displayName: "First Name",
    //func: function(value){return value !== 'Full Name';},
    //errStr: 'Only "Full Name" allowed!',
});

AccountsTemplates.addField({
    _id: 'lastName',
    type: 'text',
    displayName: "Last Name",
    //func: function(value){return value !== 'Full Name';},
    //errStr: 'Only "Full Name" allowed!',
});

AccountsTemplates.addField({
    _id: 'role',
    type: "select",
    displayName: "Role",
    select: [
        {
            text: "Looking for job",
            value: "entr",
        },
        {
            text: "Job poster",
            value: "poster",
        },
    ],
    //func: function(value){return value !== 'Full Name';},
    //errStr: 'Only "Full Name" allowed!',
    /*func:function(){
      Meteor.call('addRole()',)
    }*/
    
});

/*AccountsTemplates.addField({
    _id: 'email',
    type: 'text',
    displayName: "Emails",
    //func: function(value){return value !== 'Full Name';},
    //errStr: 'Only "Full Name" allowed!',
});
*/
AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
   
    required: true,
    func: function(value){
        if (Meteor.isClient) {
            console.log("Validating username...");
            var self = this;
            Meteor.call("userExists", value, function(err, userExists){
                if (!userExists)
                    self.setSuccess();
                else
                    self.setError(userExists);
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("userExists", value);
    },
});






/*AccountsTemplates.configure({
    texts: {
      inputIcons: {
          isValidating: "fa fa-spinner fa-spin",
          hasSuccess: "fa fa-check",
          hasError: "fa fa-times",
      }
    }
});*/


