//import SimpleSchema from 'simpl-schema';

Template.basic.onCreated(function() {
  
  var self = this;

  self.autorun(function() {
    self.subscribe('categories');
  });

});


Template.basic.helpers({

  steps: function() {
    return [{
      id:'categories',
      title:'What would you need',
      template:'categories',
      formId:'categories-form',
      schema:Schemas.Categories,
    },
    {
      id: 'details',
      title: 'Job details',
      template: 'details',
      formId: 'details-form',
      schema: Schemas.detailsInformation,
    }, 
    {
      id: 'contactInformation',
      title: 'Contact & confirm',
      template: 'contactInformation',
      formId: 'contactInformation-form',
      schema: Schemas.contactInformation,
      
      onSubmit: function(data, wizard) {
        
        var self = this;
       
        Jobs.insert(_.extend(wizard.mergedData(), data), function(err, id) {
          if (err) {
   
            self.done();
            
          } else {
            FlowRouter.go('account', {	//go to my account after job successfully added
              _id: id
            });
          }
        });
      }
    }];
  }
});



Template.categories.helpers({

	
    categoryOptions: function() {
        return Categories.find().fetch().map(function(obj) {
        	console.log(obj.label);
    	    return { label: obj.label, value: obj.value };
        });
    },
	
 /*   subcategoryOptions: function() {
        var mainCat = AutoForm.getFieldValue(this.name.replace('.subCategory', '.mainCategory'));
        return Categories.findOne({ name: mainCat }).subCategories.map(function(obj) {
          return { label: obj.name, value: obj.name };
        });
      },
      */
	catOptions:function(){
		
		
		return[
			
				{label: "Bathroom Specialist", value: "bath"},
	       		{label: "Bricklayer", value: "bricklayer"},
	       		{label: "Builder", value: "builder"},
	       		
	       		//new values
	       		{ value:"network", label:"Aerial / Network Specialist"},
				{ value:"bathroom", label:"Bathroom Specialist"},
				{ value:"bricklayer", label:"Bricklayer"},
				{ value:"builder", label:"Builder"},
				{ value:"carpenter", label:"Carpenter / Joiner"},
				{ value:"cleaner", label:"Cleaner"},
				{ value:"drainage", label:"Drainage Specialist"},
				{ value:"driveway", label:"Driveway Services"},
				{ value:"electrician", label:"Electrician"},
				{ value:"flooring", label:"Flooring Specialist"},
				{ value:"gardener", label:"Gardener / Garden Designer"},
				{ value:"handyman", label:"Handyman"},
				{ value:"heating", label:"Heating Engineer"},
				{ value:"kitchen", label:"Kitchen Specialist"},
				{ value:"locksmiths", label:"Locksmith"},
				{ value:"loft", label:"Loft Conversion Specialist"},
				{ value:"metalworker", label:"Metalworker"},
				{ value:"decorator", label:"Painter / Decorator"},
				{ value:"pest", label:"Pest Control"},
				{ value:"plasterer", label:"Plasterer / Renderer"},
				{ value:"plumber", label:"Plumber"},
				{ value:"roofer", label:"Roofer"},
				{ value:"security", label:"Security Specialist"},
				{ value:"specialist", label:"Specialist Tradesman"},
				{ value:"stoneworker", label:"Stoneworker / Stonemason"},
				{ value:"pool", label:"Swimming Pool Specialist"},
				{ value:"tiler", label:"Tiler"},
				{ value:"craftsman", label:"Traditional Craftsman"},
				{ value:"tree", label:"Tree Surgeon"},
				{ value:"windows", label:"Window &amp; Conservatory Specialist"}
			
			];
	}
});

Template.details.helpers({

	urgencyOptions:function(){
		
		return[
			
		   		{label: "Urgently", value: "Urgent"},
        		{label: "Flexible start date", value: "Flexible start date"},
        		{label: "Within few days", value: "Within few days"}
			];
	}
	
});





Wizard.useRouter('kadira:flow-router');


FlowRouter.route('/basic/:step?', {
  name: 'basic',
  //template: 'categories',
  onBeforeAction: function() {
    if (!this.params.step) {
      this.redirect('basic', {
        step: 'contactInformation'
      });
    } else {
      this.next();
    }
  }
});

FlowRouter.route('/orders/:_id', {
  name: 'viewOrder',
  template: 'viewOrder',
  data: function() {
    return Jobs.findOne(this.params._id);
  },
  action:function(params,queryParams){
    BlazeLayout.render('masterLayout',{
      footer:"footer",
      main:"viewOrder",
      nav:"nav",
     
    });
  }
});