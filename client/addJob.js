Template.basic.helpers({
  steps: function() {
    return [{
      id: 'details',
      title: 'Job details',
      schema: Schemas.detailsInformation
    }, {
      id: 'contactInformation',
      title: 'Contact & confirm',
      schema: Schemas.contactInformation,
      onSubmit: function(data, wizard) {
        var self = this;
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
  }
});