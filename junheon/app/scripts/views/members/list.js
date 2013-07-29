(function () {
  'use strict';

  var root = this;

  root.define([
    'jquery',
    'underscore',
    'backbone',
    'views/members/list_item'
  ], function (
    $,
    _,
    Backbone,
    MemberListItemView
  ) {
    var MemberListView = Backbone.View.extend({
      initialize: function () {
        this.children = {};

        this.listenTo(this.collection, 'add', this.renderListItemView);
      },

      render: function () {
        this.collection.each(function (model) {
          this.renderListItemView(model);
        }.bind(this));

        return this;
      },

      renderListItemView: function (model) {
        this.$el.append(this.getListItemView(model).el);
      },

      getListItemView: function (model) {
        var listItemView = new MemberListItemView({
          model: model
        });

        listItemView.render();

        this.children[listItemView.cid] = listItemView;

        return listItemView;
      }

    });

    return MemberListView;
  });

}).call(this);
