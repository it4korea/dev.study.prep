define(['backbone'], function(Backbone) {
  var Profile = Backbone.Model.extend({
    defaults: {
      name : 'YongHun Byun',
      job: 'Web Programmer'
    },
    initialize: function(){
    }
  });
  return Profile;

});
