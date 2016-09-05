Template.basic.helpers({
  steps: function() {
    return [{
      id:'categories',
      title:'What would you need',
      template:'categories',
      formId:'categories-form',
      schema:Schemas.Categories
    },
    {
      id: 'details',
      title: 'Job details',
      template: 'details',
      formId: 'details-form',
      schema: Schemas.detailsInformation
    }, {
      id: 'contactInformation',
      title: 'Contact & confirm',
      template: 'contactInformation',
      formId: 'contactInformation-form',
      schema: Schemas.contactInformation,
      onSubmit: function(data, wizard) {
        let self = this;
        Jobs.insert(_.extend(wizard.mergedData(), data), function(err, id) {
          if (err) {
            self.done();
          } else {
            FlowRouter.go('viewOrder', {
              _id: id
            });
          }
        });
      }
    }];
  }
});

Wizard.useRouter('kadira:flow-router');


FlowRouter.route('/basic/:step?', {
  name: 'basic',
  template: 'categories',
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