BlazeLayout.setRoot('body');


/*var options = {
  keepHistory: 0,
  localSearch: true,

  subscriptionName: 'jobs.byIds' // Use subscription by this name
 };

var fields = ['name', 'description','categories'];

//search
JobSearch = new SearchSource('joburi', fields, options);

*/
Template.JobList.onCreated(function() {
/*  	//reactive var
  	let template = Template.instance();
  	template.searchQuery = new ReactiveVar();
	  template.searching   = new ReactiveVar( false );
	 
	  //
  template.autorun( () => {
    template.subscribe( 'joburi', template.searchQuery.get(), () => {
      setTimeout( () => {
        template.searching.set( false );
      }, 300 );
    });
  });
*/

/*  JobSearch.search('');*/
  var self = this;
  Session.set("searchValue", " ");
  Session.set("filterValue", "")
  self.autorun(function() {
    self.subscribe('search');
  });

});


Template.JobList.onRendered(function() {

  Session.set("searchValue", " ");
  Session.set("filterValue", "")


});

/*Template.JobList.rendered=function(){
	
	JobSearch.search('');
	$('#category').append('<p>Loading image</p>');
};
*/


Template.JobList.events({ 
	'click .toggleisApplied':function(){
		Meteor.call('toggleJobApplyedStatus',this._id,this.isApplyed);
/**/
	},

  "keyup #search": _.throttle(function (e) {
      e.preventDefault();
      //Session.set("filterValue", "");
      delete Session.keys['filterValue'];
      Session.set("searchValue", $("#searchValue").val());

    },200),


   'change input': function(event) {
     var x = event.target.value;
      //Session.set("searchValue","");
      delete Session.keys['searchValue'];
      Session.set("filterValue", x);
      console.log(Session.get("filterValue"));

 }
/*	'keyup [name="search"]' ( event, template ) {
    let value = event.target.value.trim();

    if ( value !== '' && event.keyCode === 13 ) {
      template.searchQuery.set( value );
      template.searching.set( true );
    }

    if ( value === '' ) {
      template.searchQuery.set( value );
    }
  }
*/
//instant search
/*	"keyup #search-box": _.throttle(function(e) {
    	var text = $(e.target).val().trim();
    	JobSearch.search(text);
 	}, 200)*/
});


Template.JobList.helpers({
	
	/*jobs: () => {
		return Jobs.find({isApplyed:false});
	},*/

  jobs: function() {
    Meteor.subscribe("filter", Session.get("filterValue"));
    Meteor.subscribe("search", Session.get("searchValue"));
    if (Session.get("filterValue")){
      console.log("filter for " + Session.get("filterValue"));
      return Jobs.filter(Session.get("filterValue"));
    }
    else if (Session.get("searchValue")) {
     
      /*return Jobs.find({isApplyed:false}, { sort: [["score", "desc"]] }).fetch();*/
      return Jobs.search(Session.get("searchValue"));
    }
    else {
      return Jobs.find({isApplyed:false}).fetch();
    }
  },

	categoryIs: function(){
		
		var categ = Jobs.findOne({_id:this._id},{fields:{'category':1}}); //returns only _id and category of all objects
		//console.log(categ);

		if (categ.category === "bathroom")
			return "bathroom"
		if (categ.category === "builder")
			return "builder"
		else if (categ.category === "bricklayer")
			return "bricklayer"
	},
	categories: function(){
		
		var categs = Jobs.find({_id:this._id},{fields:{'category':1}}); //returns only _id adn category of all objects
		console.log(categs.category);
		return categs;
	},


	
/*//simplesearch
  searching() {
    return Template.instance().searching.get();
  },
  query() {
    return Template.instance().searchQuery.get();
  },
  joburi() {
    let joburi = Jobs.find();
    if ( joburi ) {
      return joburi;
    }
  }*/
/*	
	 getJobs: function() {
    return JobSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "$&")
      },
      sort: {isoScore: -1}
    });
  	},
  	isLoading: function() {
    return JobSearch.getStatus().loading;
    },
    isSearching:function(){
      var searchText= $('#search-box').val().trim();
      console.log(searchText);
      return searchText;
    }*/


});



/*Template.JobList.helpers({
	textValue: function() {
		return 
    if (this.en) {
      return this.text.tc;
    } else if (this.tc) {
      return this.text.tc;
    }
  }
});*/
