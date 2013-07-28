$(function(){
	var Shape=Backbone.Model.extend({defaults:{x:50,y:50,width:150,height:150,color:'black'},setTopLeft:function(x,y){this.set({x:x,y:y});},setDim:function(w,h){this.set({width:w,height:h});
	},isCircle:function(){return!!this.get('circle');
	}});
	var Document=Backbone.Collection.extend({model:Shape});var DocumentView=Backbone.View.extend({id:'page',views:{},initialize:function(){this.collection.bind('add',function(model){this.views[model.cid]=new ShapeView({model:model,id:'view_'+ model.cid}).render();
	},this);this.collection.bind('remove',function(model){this.views[model.cid].remove();delete this.views[model.cid];},this);},render:function(){return this;}});var ShapeView=Backbone.View.extend({initialize:function(){$('#page').mousemove(this,this.mousemove).mouseup(this,this.mouseup);this.model.bind('change',this.updateView,this);
	},render:function(){$('#page').append(this.el);$(this.el).html('<div class="shape"/>'
	+'<div class="control delete hide"/>'
	+'<div class="control change-color hide"/>'
	+'<div class="control resize hide"/>').css({position:'absolute',padding:'0px'});
	if(this.model.isCircle()){this.$('.shape').addClass('circle');
	}
	this.updateView();
	return this;
	},updateView:function(){$(this.el).css({left:this.model.get('x'),top:this.model.get('y'),width:this.model.get('width')- 10,height:this.model.get('height')- 10});this.$('.shape').css({background:this.model.get('color')});},events:{'mouseenter .shape':'hoveringStart','mouseleave':'hoveringEnd','mousedown .shape':'draggingStart','mousedown .resize':'resizingStart','mousedown .change-color':'changeColor','mousedown .delete':'deleting',},hoveringStart:function(e){this.$('.control').removeClass('hide');},hoveringEnd:function(e){this.$('.control').addClass('hide');},draggingStart:function(e){this.dragging=true;this.initialX=e.pageX- this.model.get('x');this.initialY=e.pageY- this.model.get('y');return false;},resizingStart:function(e){this.resizing=true;return false;},changeColor:function(e){this.model.set({color:prompt('Enter color value',this.model.get('color'))});},deleting:function(e){this.model.collection.remove(this.model);},mouseup:function(e){if(!e||!e.data)return;var self=e.data;self.dragging=self.resizing=false;},mousemove:function(e){if(!e||!e.data)return;var self=e.data;if(self.dragging){self.model.setTopLeft(e.pageX- self.initialX,e.pageY- self.initialY);}else if(self.resizing){self.model.setDim(e.pageX- self.model.get('x'),e.pageY- self.model.get('y'))
	;}}});
	var document=new Document();
	var documentView=new DocumentView({collection:document});documentView.render();
	document.add([
	{"x":116,"y":338,"width":50,"height":50,"color":"blue"},
	{"x":116,"y":378,"width":50,"height":50,"color":"blue"},
	{"x":116,"y":418,"width":50,"height":50,"color":"blue"},
	{"x":116,"y":458,"width":50,"height":50,"color":"blue"},
	{"x":116,"y":498,"width":50,"height":50,"color":"blue"},
	{"x":116,"y":538,"width":50,"height":50,"color":"blue"},
	{"x":116,"y":578,"width":50,"height":50,"color":"blue"},
	
	{"x":156,"y":458,"width":50,"height":50,"color":"blue"},
	{"x":196,"y":458,"width":50,"height":50,"color":"blue"},
	{"x":236,"y":458,"width":50,"height":50,"color":"blue"},
	{"x":276,"y":458,"width":50,"height":50,"color":"blue"},
	
	{"x":316,"y":338,"width":50,"height":50,"color":"blue"},
	{"x":316,"y":378,"width":50,"height":50,"color":"blue"},
	{"x":316,"y":418,"width":50,"height":50,"color":"blue"},
	{"x":316,"y":458,"width":50,"height":50,"color":"blue"},
	{"x":316,"y":498,"width":50,"height":50,"color":"blue"},
	{"x":316,"y":538,"width":50,"height":50,"color":"blue"},
	{"x":316,"y":578,"width":50,"height":50,"color":"blue"},
	
	{"x":416,"y":418,"width":50,"height":50,"color":"blue"},
	
	{"x":416,"y":498,"width":50,"height":50,"color":"blue"},
	{"x":416,"y":538,"width":50,"height":50,"color":"blue"},
	{"x":416,"y":578,"width":50,"height":50,"color":"blue"},
	{"x":558,"y":259,"width":463,"height":448,"color":"#FDD017","circle":true},
	{"x":630,"y":379,"width":85,"height":85,"color":"black","circle":true},
	{"x":835,"y":384,"width":85,"height":85,"color":"black","circle":true},
	{"x":637,"y":569,"width":310,"height":36,"color":"black"},
	{"x":631,"y":544,"width":41,"height":61,"color":"black"},
	{"x":906,"y":543,"width":41,"height":61,"color":"black"}]);
	$('#new-rectangle').click(function(){document.add(new Shape());});
	$('#new-circle').click(function(){document.add(new Shape({circle:true}));
	});
});