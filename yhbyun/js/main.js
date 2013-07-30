require.config({
  baseUrl: './',
  paths: {
    // Libraries
    jquery: 'js/lib/jquery.min',
    underscore: 'js/lib/underscore-min', 
    backbone: 'js/lib/backbone-min',
    text:   'js/lib/text',

    // Application Places
    view: 'js/views', 
    model: 'js/models'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'jquery': {
      exports: '$'
    }
  }
});


require(['view/app'], function(AppView) {
  var appView = new AppView;
  appView.render();
});

