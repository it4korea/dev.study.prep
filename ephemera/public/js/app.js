'use strict';

var directory = {
  views:{},
  models: {},
  loadTemplates: function(views, callback) {
    var deferreds = [];
    $.each(views, function(index, view) {
      console.log(directory);
      if (directory[view]) {
        deferreds.push($.get('tpl/' + view + '.html', function(data) {
          directory[view].prototype.template = _.template(data);
        }, 'html'));
      } else {
        console.log(view + ' not found');
      }
    });
    $.when.apply(null, deferreds).done(callback);
  }
};

directory.Router = Backbone.Router.extend({
  routes: {
    '': 'home'
  },
  initialize: function() {
    directory.shellView = new directory.ShellView();
    $('body').html(directory.shellView.render().el);
    this.$content = $('#content');
  },

  home: function() {
    if (!directory.homeView) {
      directory.homeView = new directory.HomeView();
      directory.homeView.render();
    } else {
      console.log('reusing home view');
      directory.homeView.delegateEvents();
    }
    this.$content.html(directory.homeView.el);
  }
});

$(document).on('ready', function() {
  directory.loadTemplates(['ShellView', 'HomeView'], function() {
    directory.router = new directory.Router();
    Backbone.history.start();
  });
});
