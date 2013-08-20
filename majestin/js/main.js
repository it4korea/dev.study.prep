//Models
window.Member = Backbone.Model.extend({
	defaults:{
		'name':'default name',
		'email':'default email'
	}

});

//Collections
window.MemberCollection = Backbone.Collection.extend({
	model:Member
});


//Views
window.MemberListView = Backbone.View.extend({
	className:"thumbnails",
	tagName:'ul',

	initialize:function () {
		this.memberAddView = new MemberAddView();

	},

	render:function (eventName) {
		this.$el.detach();
		this.$el.empty();

		_.each(this.model.models, function (member) {
			$(this.el).append(new MemberListItemView({model:member}).render().el);
		}, this);

		$(this.el).append(this.memberAddView.render().el);
		console.log(this.el);

		return this;
	}
});


window.MemberListItemView = Backbone.View.extend({
	tagName:"li",

	template:_.template($('#member-list-item').html()),

	initialize:function () {
		this.model.bind("change", this.render, this);
		this.model.bind("destroy", this.close, this);

	},

	render:function (eventName) {

		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},

	events: {
		"click .deleteBtn":"removeItem"
	},

	close:function () {
		$(this.el).unbind();
		$(this.el).remove();
	},

	removeItem: function() {
		memberList.remove( this.model );
    	$('#content').html(memberListView.render().el);
	}
});


window.MemberAddView = Backbone.View.extend({
	tagName:"li",

	template:_.template($('#member-add-item').html()),

	initialize:function () {
		// this.render();
	},

	render:function (eventName) {
		this.delegateEvents();
		$(this.el).html(this.template());
		return this;
	},

	events:{
		"keyup .newName":"focusEmail",
		"keyup .newEmail":"newMember",
		"blur .newEmail":"newMember"
	},

	focusEmail:function (event) {
		console.log(event);
		if (event.keyCode == 13) {
			//enter 입력
			$('.newEmail').focus();
		}
	},

	newMember:function (event) {
		// app.navigate("wines/new", true);
		console.log(event);

		if (event.keyCode == 13  ) {
			this.addMember(new Member({name: $('.newName').val(), email: $('.newEmail').val()}) );

		} else if( $('.newName').val() != '' && $('.newEmail').val() != '' ) {
    		//커서가 다른대로 갔을때 
			// this.addMember(new Member({name: $('.newName').val(), email: $('.newEmail').val()}) );

    	}

    	return false;
    },

    addMember: function(member) {
    	memberList.add(member);
    	$('#content').html(memberListView.render().el);
    }

});


var member1 = new Member({name: '이한국', email: 'leekorea09@gmail.com'}),
member2 = new Member({name: '이미국', email: 'america@gmail.com'}),
member3 = new Member({name: '이중국', email: 'china@gmail.com'});

var memberList = new MemberCollection();
memberList.add([member1,member2,member3]);

var memberListView = new MemberListView({model:this.memberList});

$('#content').html(this.memberListView.render().el);
