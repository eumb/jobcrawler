Jobs= new Mongo.Collection('jobs');

Jobs.allow({
	insert:function(userId,doc){
		return !!userId;   //you are allowed if it is = to userId
		//like when signed in
	}
});

Category = new SimpleSchema({

  name: {
    type:String
  }

});

JobSchema = new SimpleSchema({

	name:{
		type:String,
		label: "Name"
	},
	description:{
		type: String,
		label:"Description"
	},
  categories:{
    type:[Category],
    label:"Category"
  },
  isCommited:{
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


	}

});

Jobs.attachSchema(JobSchema);
