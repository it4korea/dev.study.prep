(function () {
  'use strict';

  var root = this;

  root.require.config({
    paths: {

      jquery        : '../bower_components/jquery/jquery',
      underscore    : '../bower_components/underscore/underscore',
      backbone      : '../bower_components/backbone/backbone',
      text          : '../bower_components/requirejs-text/text',

      templates   : '../templates',

      bootstrap   : 'vendor/bootstrap'
    },

    shim: {

      underscore: {
        exports: '_'
      },

      backbone: {
        deps: ['jquery', 'underscore'],
        exports: 'Backbone'
      },

      bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
      }

    }
  });

  root.require(['router'], function (Router) {
    Router.initialize();
  });
}).call(this);
