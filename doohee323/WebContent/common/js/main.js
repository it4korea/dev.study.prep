var Msgs = {
	msg : "ID는 lhfadm 입니다."
};
var InitDiv;

// view
var LoginV = Backbone.View.extend({
	el : $("#loginUL"),
	tagName : "li",
	className : "st",
	template : $("#template").html(),
	initialize : function() {
		InitDiv = this.$el.html();
		tmpl = _.template(this.template);
	},
	render : function() {
	},
	doLogin : function(e) {
		e.preventDefault();
		
		var tmpl = _.template(this.template);
		if($('#userId')[0].value.indexOf('lhfadm') == -1) {
			$("#loginUL").html(InitDiv + tmpl(Msgs));
			return;
		}
		var params = {
			params : {
				qId : "loginXP.chkUserLogin",
				userId : loginForm.userId.value
			}
		};
		$.ajax({
			type : "post",
			url : 'sy/common/login/existUserId.xpl',
			data : JSON.stringify(params),
			datatype : "json",
			contentType : "application/json+core; charset=utf-8",
			success : function(data) {
				var msg;
				if (data && data.success) {
					msg = data.success[0];
					if (msg && msg != '') {
						Msgs.msg = msg;
						$("#loginUL").html(InitDiv + tmpl(Msgs));
					} else {
						var userId = encodeURIComponent($('#userId')[0].value);
						var passwd = encodeURIComponent($('#userPwd')[0].value);
						$('#j_username').val(userId);
						$('#j_password').val(passwd);

						var frm = $('#f')[0];
						frm.submit();
					}
				} else {
					Msgs.msg = '사용자 계정이 없습니다.';
					$("#loginUL").html(InitDiv + tmpl(Msgs));
				}
			}
		});
	},
	events : {
		"click #add" : "doLogin"
	}
});

// Router
var AppRouter = Backbone.Router.extend({
	routes : {
		"/posts/:id" : "getPost",
		"*actions" : "defaultRoute"
	},
	getPost : function(id) {
		alert("Get post number " + id);
	},
	loadView : function(route, action) {
		alert(route + "_" + action);

	},
	defaultRoute : function(actions) {
	}
});

var app_router = new AppRouter;
Backbone.history.start();

var loginV = new LoginV();