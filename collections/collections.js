/*import SimpleSchema from 'simpl-schema';*/
import 'babel-polyfill';
Jobs= new Mongo.Collection('jobs');
Categories = new Mongo.Collection('categories');
Schemas = {};


Jobs.allow({
	insert:function(userId,doc){
		return !!userId;   //you are allowed if it is = to userId
		//like when signed in
	},
	update:function(userId,doc){
		return !!userId;   //you are allowed if it is = to userId
		//like when signed in
	}
});


Schemas.Categ = new SimpleSchema({
  label: {
    type: String,
    unique: true
  },
      autoform: {
      options: [
        {label: "Red", value: "red"},
        {label: "Green", value: "green"},
        {label: "Blue", value: "blue"}
      ]
    },
  value:{
  	type:String,
  	
  },
  subCategories: {
    type: [Object],
    minCount: 1
  },
  "subCategories.$.name": {
    type: String
  }
});





Schemas.Categs = new SimpleSchema({

	name: {
    type: String,
    label: "Name",
    max: 100,
  },
  categories: {
    type: [Object],
    minCount: 1
  },
  "categories.$.mainCategory": {
    type: String
  },
  "categories.$.subCategory": {
    type: String,
  }
});


Categories.attachSchema([
	Schemas.Categs,
	Schemas.Categ
]);


Schemas.detailsInformation = new SimpleSchema({

	name:{
		type:String,
	
		label: "Give your job a name"
	},
	description:{
		type: String,
	 	label:"Describe what you need"
	},

	urgency:{
		type: String,
		label:"When would you like the job to start?"
/*		autoform:{
			type: "select2",
			options:[
			   	{label: "Urgently", value: "Urgent"},
        		{label: "Flexible start date", value: "Flexible start date"},
        		{label: "Within few days", value: "Within few days"}
			]
		}*/
	},





  isCommited:{
    type:Boolean,
    defaultValue:false,
    optional:true,
    blackbox: true
    /*autoform:{
      type:"hidden"
    }*/
  },
   isApplyed:{
    type:Boolean,
    defaultValue:false,
    optional:true
   /* autoform:{
      type:"hidden"
    }*/
  },
   isCompleted:{
    type:Boolean,
    defaultValue:false,
    optional:true
   /* autoform:{
      type:"hidden"
    }*/
  },
	author:{
		type:String,
		label:"Author",
		autoValue:function(){
			return this.userId;
		},
		/*autoform:{
			type:"hidden"
		}*/

	},
	createdAt:{
		type:Date,
		label:"Created at",
		autoValue:function(){
			return new Date();
		}
		/*autoform:{
			type:"hidden"
		}*/


	},
	
	purchasedBy:{
		type:String,
		label:"purchasedBy",
		defaultValue:"available"
		/*autoform:{
			type:"hidden"
		}*/

	},
});


Schemas.contactInformation = new SimpleSchema({
 location:{
		type: String,
		label:"Tell us where the job will take place"
	},

	phone:{
		type: Number,
		label:"What number can the tradesperson contact you on?"
	}

});




Jobs.attachSchema([
	Schemas.detailsInformation,
	Schemas.contactInformation,
	Schemas.Categories
]);


SimpleSchema.debug = true;





Schema = {};

Schema.UserCountry = new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String,
        regEx: /^[A-Z]{2}$/
    }
});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    role: {
        type: String,
        optional: true
    },
    /*gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },*/
    organization : {
        type: String,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    }/*,
    country: {
        type: Schema.UserCountry,
        optional: true
    }*/
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
    registered_emails: {
        type: Array,
        optional: true
    },
    'registered_emails.$': {
        type: Object,
        blackbox: true
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
   /* roles: {
        type: Object,
        optional: true,
        blackbox: true
    },*/
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: Array,
        optional: true
    },
    'roles.$': {
        type: String
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }
});

Meteor.users.attachSchema(Schema.User);






Meteor.methods({
	toggleJobApplyedStatus:function(id, currentState){
        console.log("going to insert " + id);
        console.log(Meteor.userId());
        Jobs.update({_id:id},{$set:{isApplyed:!currentState,purchasedBy:Meteor.userId() }},{ filter: false, validate: false });

    },
    toggleJobCompletedStatus:function(id, currentState){
        console.log("going to insert " + id);
        console.log(Meteor.userId());
        Jobs.update({_id:id},{$set:{isCompleted:!currentState}},{ filter: false, validate: false });

    },
    
 /*   addRole: function(role){
    Meteor.users.after.insert(function(userId, doc){
      Roles.addUsersToRoles(doc._id, role);
    })
  }*/

});



Jobs.search = function(query) {  
  return Jobs.find({
   isApplyed:false, name: { $regex: RegExp(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Jobs.filter = function(query) {  
  return Jobs.find({
   isApplyed:false, category: { $regex: RegExp(query), $options: 'i' }
  }, {
    limit: 20
  });
};
 /* Jobs.update(id, {
                $set:{
                    isApplyed:!currentState,
                    purchasedBy:Meteor.users.username
                }}, function(error, result){
  Jobs.simpleSchema().namedContext().validate({validate:false},{filter:false})
    });
}*/