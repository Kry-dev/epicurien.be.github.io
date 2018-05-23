
$(document).ready(function(){
    var triggers = $('.alphabet .btn-group a.btn');
    var filters = $('ul.dictionary li a');

    triggers.click(function() {
        console.log('trigger click');
        var takeLetter = $(this).text();
        filters.parent().hide();

        filters.each(function(i) {
            var compareFirstLetter = $(this).text().substr(0,1);
            if ( compareFirstLetter ==  takeLetter ) {
                $(this).parent().fadeIn(222);
            }

            //problem on detecting empty one. Press 'B' for example.
            //i can reach manually but this way is useless
            if (takeLetter ==='B') {console.log('There is no result.');}
        });

    });
});
