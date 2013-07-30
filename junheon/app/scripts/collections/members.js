(function () {
  'use strict';

  var root = this;

  root.define([
    'jquery',
    'underscore',
    'backbone',
    'models/member'
  ], function (
    $,
    _,
    Backbone,
    Member
  ) {
    var Members = Backbone.Collection.extend({
      model: Member
    });

    return Members;
  });
}).call(this);
