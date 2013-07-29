(function () {
  'use strict';

  var root = this;

  root.define([
    'jquery',
    'underscore',
    'backbone'
  ], function (
    $,
    _,
    Backbone
  ) {
    var Member = Backbone.Model.extend({
      defaults: {
        name    : '',
        email   :  '',
        message : ''
      },

      validate: function (attrs) {
        if (_.isEmpty(attrs.name)) {
          return '이름을 입력해주세요.';
        }

        if (_.isEmpty(attrs.email)) {
          return '이메일을 입력해주세요.';
        }
      }

    });

    return Member;
  });

}).call(this);
