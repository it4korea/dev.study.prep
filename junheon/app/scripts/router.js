(function () {
  'use strict';

  var root = this;

  root.define([
    'jquery',
    'underscore',
    'backbone',
    'collections/members'
  ], function (
    $,
    _,
    Backbone,
    Members
  ) {
    var AppRouter, initialize;

    AppRouter = Backbone.Router.extend({
      routes: {
        '' : 'main'
      }
    });

    initialize = function (options) {
      var router = new AppRouter(options);

      router.on('route:main', function () {
        var members = new Members([
          { name: '이준헌', email: 'for2ternity at gmail.com', message: '잘 부탁드립니다.' }
        ]);

        require(['views/members/list', 'views/members/form'], function (MemberListView, MemberFormView) {
          var memberFormView, memberListView;

          memberListView = new MemberListView({
            el          : '#members',
            collection  : members
          });

          memberListView.render();

          memberFormView = new MemberFormView({
            el          : '#add_member',
            collection  : members
          });

          memberFormView.render();

        });
      });

      Backbone.history.start();
    };

    return { initialize: initialize };
  });
}).call(this);
