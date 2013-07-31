(function () {
  'use strict';

  var root = this;

  root.define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/members/list_item.tpl'
  ], function (
    $,
    _,
    Backbone,
    tpl
  ) {
    var MemberListItemView = Backbone.View.extend({
      template  : _.template(tpl),
      className : 'span6',
      render: function () {
        var listItem = this.template(this.getModelData());

        this.$el.html(listItem);

        return this;
      },

      getModelData: function () {
        return this.model.toJSON();
      }
    });

    return MemberListItemView;
  });

}).call(this);
