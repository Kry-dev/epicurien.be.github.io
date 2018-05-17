var $ = require('jquery');
var slick = require('slick-carousel');

$(document).ready(function(){
    $(window).scroll(function() {
        if ($(this).scrollTop()) {
            $("#toTop").fadeIn();
        } else {
            $("#toTop").fadeOut();
        }
        if($(window).scrollTop() + $(window).height() < $(document).height() - $("#footer").height()) {
            $('#toTop').css("position","fixed");    //resetting it
            $('#toTop').css("bottom","20"); //resetting it
        }
    });


    $("#toTop").click(function() {
        $("html, body").animate({scrollTop: 0}, 1000);
    });
});