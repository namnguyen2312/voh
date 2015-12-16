(function($) {
    $.fn.Accordion = function(options) {
        var $el = $(this);
        var defaults = {
            active: 'open',
            el_wrap: 'li',
            el_content: 'ul',
            accordion: true,
            expand: true,
            btn_open: '<i class="fa fa-plus-square-o"></i>',
            btn_close: '<i class="fa fa-minus-square-o"></i>'
        };
        var options = $.extend({}, defaults, options);
        $(document).ready(function() {
            // $el.find(options.el_wrap).each(function() {
            //     $(this).find('> a, > span, > h4').wrap('<div class="accr_header"></div>');
            //     if (($(this).find(options.el_content)).length) {
            //         $(this).find('> .accr_header').append('<span class="btn_accor">' + options.btn_open + '</span>');
            //         $(this).find('> ' + options.el_content + ':not(".accr_header")').wrap('<div class="accr_content"></div>');
            //     }
            // });
            if (options.accordion) {
                $('.accr_content').hide();
                $el.find(options.el_wrap).each(function() {
                    if ($(this).hasClass(options.active)) {
                        $(this).find('> .accr_content').addClass(options.active).slideDown();
                        $(this).find('> .accr_header').addClass(options.active);
                    }
                });
            } else {
                $el.find(options.el_wrap).each(function() {
                    if (!options.expand) {
                        $('.accr_content').hide();
                    } else {
                        $(this).find('> .accr_content').addClass(options.active);
                        $(this).find('> .accr_header').addClass(options.active);
                        $(this).find('> .accr_header .btn_accor').html(options.btn_close);
                    }
                });
            }
        });
        $(window).load(function() {
            $el.find(options.el_wrap).each(function() {
                var $wrap = $(this);
                var $accrhead = $wrap.find('> .accr_header');
                var btn_accor = '.btn_accor';
                $accrhead.find(btn_accor).on('click', function(event) {
                    event.preventDefault();
                    var obj = $(this);
                    var slide = true;
                    if ($accrhead.hasClass(options.active)) {
                        slide = false;
                    }
                    if (options.accordion) {
                        $wrap.siblings(options.el_wrap).find('> .accr_content').slideUp().removeClass(options.active);
                        $wrap.siblings(options.el_wrap).find('> .accr_header').removeClass(options.active);
                        $wrap.siblings(options.el_wrap).find('> .accr_header ' + btn_accor).html(options.btn_open);
                    }
                    if (slide) {
                        $accrhead.addClass(options.active);
                        obj.html(options.btn_close);
                        $accrhead.siblings('.accr_content').addClass(options.active).stop(true, true).slideDown();
                    } else {
                        $accrhead.removeClass(options.active);
                        obj.html(options.btn_open);
                        $accrhead.siblings('.accr_content').removeClass(options.active).stop(true, true).slideUp();
                    }
                    
                    return false;
                });
            });

            $('body').find('table').addClass('table-responsive');
        });
    };


    //menu slider 
        var key_slide = 1;
        
        //speed of auto slide(
        var auto_slide_seconds = 5000;

        //check if key sliding is enabled
        if(key_slide == 1){
            
            //binding keypress function
            $(document).bind('keypress', function(e) {
                //keyCode for left arrow is 37 and for right it's 39 '
                if(e.keyCode==37){
                        //initialize the slide to left function
                        slide('left');
                }else if(e.keyCode==39){
                        //initialize the slide to right function
                        slide('right');
                }
            });

        }

    //$('#menu_offcanvas').html($('#dmenu').html());            
    //$('#mmenu').find('li > .wrap_submenu > ul').unwrap();
    $('#menu_offcanvas').Accordion({
        accordion: false,
        expand: false,
        el_content: 'ul, .menuwrap',
        btn_open: '<i class="fa fa-plus"></i>',
        btn_close: '<i class="fa fa-minus"></i>'
    });
    $('#mmenu .btn2.offcanvas').on('click', function() {
        if ($('#menu_offcanvas').hasClass('active')) {
            $(this).find('.overlay').fadeOut(250);
            $('#menu_offcanvas').removeClass('active');
            $('body').removeClass('show-sidebar show-menumobile');
        } else {
            $('#menu_offcanvas').addClass('active');
            $(this).find('.overlay').fadeIn(250);
            $('body').addClass('show-sidebar show-menumobile');
        }
    });

    $('#user-wrap li:first').hover(function() {
        $('.user-login').addClass('hover-login');
    }, function() {
        /* Stuff to do when the mouse leaves the element */
        $('.user-login').removeClass('hover-login');
    });
    $('#user-wrap li:first').click(function(event) {
        /* Act on the event */
        $('.user-login').addClass('hover-login');
    });

    //ticker
    $('#hot-news-ul').webTicker();
    
    //thêm nội dung vào footer
    $('#footer .container').html('<p class="ftcontent">ĐÀI TIẾNG NÓI NHÂN DÂN THÀNH PHỐ HỒ CHI MINH<br>GIỚI THIỆU | TỶ GIÁ VÀNG | GIÁ CHỨNG KHOÁN | LIÊN KẾT WEBSITE<br> số 3 Nguyễn Đình Chiểu, Quận 1, Tp. Hồ Chí Minh Tel: (84.8)38225933 - Fax: (84.8)38225933</p>')

})(jQuery);

//slide function  
function slide(where){
    
            //get the item width
          //  var listitem_width = $('.menuwrap').outerWidth();
            var item_width = $('.menu-slider .menubox-slider').outerWidth();
            if(where == 'left') {
                var left_indent = parseInt($('menu-slider').css('left')) + item_width;
               
            }else {
                var left_indent = parseInt($('menu-slider').css('left')) - item_width;
            }
            
            //make the sliding effect using jQuery's animate function... '
            $('.menu-slider:not(:animated)').animate({'left' : left_indent},100,function(){    
                
                if(where == 'left'){
                
                        $('.menu-slider').css('left',item_width);
                   
                }else{
                    if (item_width == listitem_width) {
                        alert(item_width);
                        $('.menu-slider').css('left',-listitem_width);
                    } else {
                        alert('vao day');
                        return false;
                    }
                }
            });
           
}