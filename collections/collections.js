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

Category = new SimpleSchema({

  name: {
    type:String
  }

});

Schemas.detailsInformation = new SimpleSchema({

	name:{
		type:String,
		label: "Give your job a name"
	},
	description:{
		type: String,
		label:"Describe what you need"
	},
/*  categories:{
    type:[Category],
    label:"Category"
  },*/
   
	urgency:{
		type: String,
		label:"When would you like the job to start?",
		autoform:{
			options:[
			   	{label: "Urgently", value: "Urgently"},
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
	Schemas.contactInformation
]);


SimpleSchema.debug = true;

Meteor.methods({
	toggleJobApplyedStatus:function(id, currentState){
		Jobs.update(id,{
				$set:{
					isApplyed:!currentState,
					purchasedBy:Meteor.userId()
				}
			});
	}
});



