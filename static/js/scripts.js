$(document).ready(function(){
    $('#sidebar .sub-menu > a').click(function () {
        var last = $('.sub.open', $('#sidebar'));
        $(last).slideUp(200);
        $(last).removeClass("open");
        $('.menu-arrow', $(last).parent()).addClass('fa-angle-right');
        $('.menu-arrow', $(last).parent()).removeClass('fa-angle-down');

        var sub = $(this).next();
        if (sub.is(":visible")) {
            $('.menu-arrow', this).addClass('fa-angle-right');
            $('.menu-arrow', this).removeClass('fa-angle-down');
            sub.slideUp(200);
            $(sub).removeClass("open")
        } else {
            $('.menu-arrow', this).addClass('fa-angle-down');
			$('.menu-arrow', this).removeClass('fa-angle-right');
            sub.slideDown(200);
            $(sub).addClass("open")
        }
    });

    $('.toggle-nav').click(function () {
        if ($('#sidebar > ul').is(":visible") === true) {
            $('#main-content').css({
                'margin-left': '0px'
            });
            $('#sidebar').css({
                'margin-left': '-205px'
            });
            $('#sidebar > ul').hide();
            $("#container").addClass("sidebar-closed");
        } else {
            $('#main-content').css({
                'margin-left': '205px'
            });
            $('#sidebar > ul').show();
            $('#sidebar').css({
                'margin-left': '0px'
            });
            $("#container").removeClass("sidebar-closed");
        }
    });
});

