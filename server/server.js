/*var geo = new GeoCoder();
var result = geo.geocode('29 champs elysée paris');
console.log(result);*/
if (Meteor.isServer) {
  Meteor.startup(function () {
    Jobs._ensureIndex({
      "description": "text",
      "name":"text"
    });
    console.log("we have index");
  });
}



//////////meteorhacks search
/*SearchSource.defineSource('joburi', function(searchText, options) {
  var options = {sort: {isoScore: -1}, limit: 20};
  
  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {name: regExp},
      {description: regExp},
      {categories:regExp}
    ],$and:[{isApplyed: false}]};
    console.log("return search result");
    return Jobs.find(selector, options).fetch();
  } else {
    
    console.log("return all non applied jobs");
    return Jobs.find({isApplyed:false}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}


Meteor.publish('jobs.byIds', function (ids) {
  check(ids, [ String ]);

  return Jobs.find({
    _id: {
      $in: ids
    }
  });
});

*/

/*Meteor.publish( 'joburi', function( search ) {
  check( search, Match.OneOf( String, null, undefined ) );

  let query      = {},
      projection = { limit: 10, sort: { title: 1 } };

  if ( search ) {
    let regex = new RegExp( search, 'i' );

    query = {
      $or: [
        { name: regex },
        { description: regex }
        
      ]
    };

    projection.limit = 100;
     return jobs.find( query, projection );
  }

  else{

    return jobs.find();
  }

 
});*/