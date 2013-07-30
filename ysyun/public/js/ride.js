(function ($) {

    var Intro = Backbone.Model.extend({
        defaults:{
            coverImage:"img/my_cycle.png",
            title:"Introduction by myself",
            name:"Yun YoungSik (윤영식)",
            bornDate:"1971/10/02",
            keywords:"자기소개"
        }
    });

    var IntroView = Backbone.View.extend({
        tagName:"div",
        className:"introContainer",
        template:$("#introTemplate").html(),

        render:function () {
        	//tmpl은 JSON객체를 받아서 html을 반환하는 함수이다.
            var tmpl = _.template(this.template); 
            //this.el은 tagName에 정의된 것이다. jQuery html() 함수를 사용하기 위해서는 $el을 쓴다.
            this.$el.html(tmpl(this.model.toJSON())); 
            return this;
        }
    });

    var intro = new Intro();
    var introView = new IntroView({
        model: intro
    });

    $("#intro").html(introView.render().el);

})(jQuery);
