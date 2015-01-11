var Content = Backbone.View.extend({
    initialize: function(options){
        Backbone.history.on('route',function(source, path){
            this.render(path);
        }, this);
    },
    render:function(route){
        var template = route === '' ? 'default' : route;
        this.$el.animate({opacity:0, left: -50}, 250, function(){
            this.$el.html(_.template(document.getElementById(template).innerHTML))
                .animate({opacity:1, left: 0}, 250);
        }.bind(this));
    }
});

new (Backbone.Router.extend({
    routes: {
        '': '',
        'bio': 'bio',
        'music': 'music',
        'social': 'social'
    }
}));

new Content({el: document.getElementById('content')});

Backbone.history.start();