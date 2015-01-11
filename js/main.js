var Content = Backbone.View.extend({
    initialize: function(options){
        Backbone.history.on('route',function(source, path){
            this.render(path);
        }, this);
    },
    render:function(route){
        var template = route === '' ? 'default' : route;
        this.$el.html(_.template(document.getElementById(template).innerHTML));
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