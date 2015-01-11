$(function(){
    var Content = Backbone.View.extend({
        initialize: function(options){
            var self = this;
            Backbone.history.on('route',function(source, path){
                this.render(path);
            }, this);
            $(document).bind('onPlayerInit.scPlayer', function(event){
                if(Backbone.history.fragment === 'music')
                    self.render(Backbone.history.fragment);
            });
        },

        events: {
            'click .playlist-item': 'trackChange'
        },

        trackChange: function (e) {
            e.preventDefault();
            var href = e.target.href;
            $('.sc-player .sc-trackslist a[href="'+href+'"]').click();
            $('.playlist-item.active').removeClass('active');
            $(e.target).parent().addClass('active')
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
            'music': 'music'
        }
    }));

    new Content({el: document.getElementById('content')});

    Backbone.history.start();

    $(document).bind('onPlayerInit.scPlayer', function(event){
        $player = $(event.target);
        //$player.find('.sc-artwork-list, .sc-trackslist, .sc-scrubber, .sc-info > h4, .sc-info > p, .sc-info > a, .sc-info-toggle').remove();
        $player.find('.sc-info').before($player.find('.sc-controls'))
    });
});

