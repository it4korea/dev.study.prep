define(['backbone', 'model/profile', 'view/profile'], function(Backbone, ProfileModel, ProfileView) {
  var AppView = Backbone.View.extend({
    initialize: function() {
    },
    render: function() {
      var profile = new ProfileModel();
      var profileView = new ProfileView({
        el:   '#profile',
        model:  profile
      }).render();
    }
  });

  return AppView;
});