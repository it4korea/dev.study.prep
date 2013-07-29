(function () {
  'use strict';

  var root = this;

  root.define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/members/form.tpl'
  ], function (
    $,
    _,
    Backbone,
    tpl
  ) {
    var MemberFormView = Backbone.View.extend({
      template: _.template(tpl),

      events: {
        'submit' : 'addMember'
      },

      render: function () {
        this.$el.html(this.template());

        return this;
      },

      addMember: function (e) {
        e.preventDefault();

        var member = new this.collection.model();

        member.on('invalid', function (model, msg) {
          root.alert(msg);
        });

        member.on('change', function () {
          this.collection.add(member);
        }.bind(this));

        member.set(this.serializeData(), { validate: true });
      },

      serializeData: function () {
        return {
          name    : this.$('input[name="name"]').val(),
          email   : this.$('input[name="email"]').val(),
          message : this.$('textarea[name="message"]').val()
        };
      }
    });

    return MemberFormView;
  });

}).call(this);
