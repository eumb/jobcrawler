Jobs= new Mongo.Collection('jobs');
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


Schemas.Categories = new SimpleSchema({
	category:{
		type: String,
		label:"What you would need?",
		autoform:{
			options:[
			   	{label: "Bathroom Specialist", value: "bath"},
	       		{label: "Bricklayer", value: "bricklayer"},
	       		{label: "Builder", value: "builder"}
			]
		}
	}
		
});



Schemas.detailsInformation = new SimpleSchema({

	name:{
		type:String,
		index: true,
		label: "Give your job a name"
	},
	description:{
		type: String,
		index: true,
		label:"Describe what you need"
	},

	urgency:{
		type: String,
		label:"When would you like the job to start?",
		autoform:{
			options:[
			   	{label: "Urgently", value: "Urgent"},
        		{label: "Flexible start date", value: "Flexible start date"},
        		{label: "Within 2 days", value: "Within 2 days"}
			]
		}
	},





  isCommited:{
    type:Boolean,
    defaultValue:false,
    optional:true,
    autoform:{
      type:"hidden"
    }
  },
   isApplyed:{
    type:Boolean,
    defaultValue:false,
    optional:true,
    autoform:{
      type:"hidden"
    }
  },
	author:{
		type:String,
		label:"Author",
		autoValue:function(){
			return this.userId;
		},
		autoform:{
			type:"hidden"
		}

	},
	createdAt:{
		type:Date,
		label:"Created at",
		autoValue:function(){
			return new Date();
		},
		autoform:{
			type:"hidden"
		}


	},
	
	purchasedBy:{
		type:String,
		label:"purchasedBy",
		defaultValue:"available",
		autoform:{
			type:"hidden"
		}

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

Meteor.methods({
	toggleJobApplyedStatus:function(id, currentState){
  Jobs.update(id, {
				$set:{
					isApplyed:!currentState,
					purchasedBy:Meteor.userId()
				}
			});
	}
});

Jobs.search = function(query) {  
  return Jobs.find({
   isApplyed:false, name: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Jobs.filter = function(query) {  
  return Jobs.find({
   isApplyed:false, category: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

