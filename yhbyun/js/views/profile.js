define(['backbone', 'text!../templates/profile.html'], function(Backbone, TextTemplate) {

	return Backbone.View.extend({
		template: _.template(TextTemplate),

		initialize: function() {
			this.model.on('change', this.render, this);
		},

		render: function() {
			this.$el.html(this.template(this.safeData()));
			return this;
		},
		safeData: function() {
			return {
				data: this.model.toJSON()	
			};
		}
	});
});