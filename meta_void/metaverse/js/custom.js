jQuery(document).ready(function($) {




    // $(document).keyup(function(e) {
    //     if (e.key === "Escape") { // escape key maps to keycode `27`
    //         $("#tools").toggleClass("active");
    //     }
    // });

    var $nav = $('body');
    var $win = $(window);
    var winH = $win.height(); // Get the window height.

    $win.on("scroll", function() {
        if ($(this).scrollTop() > winH) {
            $nav.addClass("sticky");
        } else {
            $nav.removeClass("sticky");
        }
    }).on("resize", function() { // If the user resizes the window
        winH = $(this).height(); // you'll need the new height value
    });


    var scroll = jQuery(window).scrollTop();
    jQuery("#js-hero img").css({
        width: (100 + scroll / 20) + "%"
    })

    $("#logout").click(function() {
        $(".header-top .profileLoggedIn").removeClass('hidden');
        $(".profile-back").removeClass('active');
    });

    $("button.login").click(function() {
        $(".profile-back").removeClass('active');
    });

    $(".profileLoggedOut").click(function() {
        $('.toggle').removeClass('active');
        $('body').removeClass('akk-menu');
    });

    $(".profileLoggedIn").click(function() {
        $('.toggle').removeClass('active');
        $('body').removeClass('akk-menu');
    });

    $("#profile").click(function() {
        $('body').removeClass('akk-menu');
    });

    $(".header-menu a").click(function() {
        $('.toggle').removeClass('active');
    });

    $(".header-menu .close.toggle").click(function() {
        $('.toggle').toggleClass('active');
    });

    $("a").click(function() {
        $("html").animate({ scrollTop: 0 }, 10);
    });
    $(window).scrollTop($(window).scrollTop() + 1);


    // peter

    $(".menu-menu-1-container a").click(function() {
        $("body").removeClass("akk-menu");
    });

    $(".menu-about-us-container a").click(function() {
        $("body").removeClass("akk-menu");
    });

    $(".home_or_museum a").click(function() {
        $("body").removeClass("akk-menu");
    });

    $("#logobox a").click(function() {
        $("body").removeClass("akk-menu");
    });

    ///OOOOOLd
    //SCroll Behavior P
    jQuery(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 300) {
            jQuery("body").addClass("footer-home");
        } else {
            jQuery("body").removeClass("footer-home");
        }
    });

    var height = Math.max($(".the_museum .content .teaser-box>div:nth-child(1) picture").height(), $(".the_museum .content .teaser-box>div:nth-child(6) picture").height());
    $(".the_museum .content .teaser-box>div:nth-child(1) picture").height(height);
    $(".the_museum .content .teaser-box>div:nth-child(6) picture").height(height);

    $("body").addClass("load");

    // Button
    $(".toggle-game").click(function() {
        $(this).parent().toggleClass("active");
        // $(this).toggleClass('disabled', (i, v) => !v);
        console.log("toggle game?")
    });

    // Radio ..................

    $(".radio-game").click(function() {
        let input = $(this).prev();
        console.log(input);
        $(input).prop("checked", true); // Set to checked
        $(input).not(input).attr("data-num", 1);
        var data = $(input).attr("data-num")
        if (data == 1) {
            data = 2
            $(input).attr("data-num", data);
            return;
        }
        if (data == 2) {
            data = 1
                // $(this).prop('checked', false);
            $(input).attr("data-num", data);
            return;
        }
        console.log("Click");
    });


    $("input").click(function() {
        $("input").not(this).attr("data-num", 1);
        var data = $(this).attr("data-num")
        if (data == 1) {
            data = 2
            $(this).attr("data-num", data);
            return;
        }
        if (data == 2) {
            data = 1
                // $(this).prop('checked', false);
            $(this).attr("data-num", data);
            return;
        }
        console.log("Click");
    })

    // Participants ..................
    $("#toggleParticipants").click(function() {
        ShowParticipants(true);
        $("body").removeClass("akk-shop");

    });

    $("#Participants .back").click(function() {
        ShowParticipants(false);
    });


    $("#Participants .close").click(function() {
        ShowParticipants(false);
        ShowQAM(false);
    });

    // REMOVE?
    $("#part_users .close").click(function() {
        $("body").removeClass("akk-part_users");

    });

    $("#tools").click(function() {

        if ($("body").hasClass("akk-participants")) {
            ShowQAM(false);
            ShowParticipants(false);
        } else if ($("body").hasClass("akk-qam")) {
            ShowQAM(false);
        } else {
            ShowQAM(true);
        }
    });




    // $ für Tutorial page > template-parts > ajax-tutorial.php ..................
    $("#al-voicechat-Tutorial").click(function() {
        $("body").removeClass("akk-afterlogin");

        $("body").toggleClass("akk-tutorial");
    });


    $("#tutorialToggle").click(function() {
        ShowQAM(false);

        $("body").toggleClass("akk-tutorial");
    });



    $(".contentbox.tutorial .back button").click(function() {
        $("body").removeClass("akk-tutorial");


    });

    $(".contentbox.tutorial  .back button.shop").click(function() {
        $("body").removeClass("akk-shop");


    });

    $(".contentbox.about  .back button.about").click(function() {
        $("body").removeClass("akk-about");
    });

    // ................   shop /


    $(".header-login .back-login").click(function() {
        $("body").toggleClass("akk-login");
    });

    $("#debugger .close").click(function() {
        ShowQAM(false);
        $(".debugger-tools-game").removeClass("active");
        // $("#tools").removeClass("active");


    });

    $(".header-login .backSignup").click(function() {

        $("body").removeClass("akk-login");

    });


    $("#gotoForgotPw").click(function() {
        $("#screen-forgotpw").show();
        $("#login-form").hide();
    });


    $("#backtoSignin").click(function() {
        $("#login-form").show();
        $("#screen-forgotpw").hide();
        $("#login-create").hide();
        $("#login-createpw").hide();
        $("#login-emailverification").hide();

    });


    $(".signup").click(function() {
        $("#login-create").show();
        $("#login-form").hide();

    });


    $("#signUpEmail").click(function() {
        $("#login-createpw").show();
        $("#login-create").hide();

    });

    $("#signupProfile").click(function() {
        $("body").toggleClass("akk-login");
        $("body").toggleClass("akk-afterlogin");


        $("#login-create").hide();
        $("#login-createpw").hide();
        $("#login-emailverification").hide();
    });

    var prev = '';

    //Main Menu Toggle
    $(".toggle#menu, .close#menuclose").mousedown(function() {

        $("body").toggleClass("akk-menu");

        console.log(window.location.pathname);
        if (window.location.pathname == "/" + hubLocation + "/") {
            if ($("body").hasClass("akk-menu")) {
                UnfocusRoom();
                $(this).addClass('active');
            } else {
                FocusRoom(true);
                $(this).remove('active');
            }
        }

        if (prev == '') {
            prev = $('#location').html();

            $('#location').html('menu');

        } else {
            $('#location').html(prev);

            prev = '';
        }
    });

    $(".header-profile .back").click(function() {
        $("body").removeClass("akk-profile");
        $("#profile").removeClass("active");
    });


    $("#edit-profile").click(function() {
        $(this).parent().find("button").removeClass("active");
        $(this).toggleClass("active");
        $(".content-inside > div").removeClass("active");
        $(".edit-profile").addClass("active");
    });

    $("#home-vimu").click(function() {
        ShowQAM(false);
        $("body").removeClass("akk-watchlist");
        // $("#tools").removeClass("active");

    });

    $(".al-experience  > .next-after").click(function() {
        $(".content-inside-al .left > div").find("button").removeClass("active");
        $('#al-privatemuseum').parent().addClass("active");
        $(".content-inside-al .right > div").removeClass("active");
        $(".al-privatemuseum").addClass("active");

    });




    $("#edit-email").click(function() {
        $(this).parent().find("button").removeClass("active");
        $(this).toggleClass("active");
        $(".content-inside > div").removeClass("active");
        $(".edit-email").addClass("active");
    });

    $(".al-experience  > .next-after").click(function() {
        $(".content-inside-al .left > div").find("button").removeClass("active");
        $('#al-privatemuseum').parent().addClass("active");
        $(".content-inside-al .right > div").removeClass("active");
        $(".al-privatemuseum").addClass("active");

    });

    $("#edit-password").click(function() {
        $(this).parent().find("button").removeClass("active");
        $(this).toggleClass("active");
        $(".content-inside > div").removeClass("active");
        $(".edit-password").addClass("active");
    });


    $(".al-experience  > .next-after").click(function() {
        $(".content-inside-al .left > div").find("button").removeClass("active");
        $('#al-privatemuseum').parent().addClass("active");
        $(".content-inside-al .right > div").removeClass("active");
        $(".al-privatemuseum").addClass("active");

    });

    $("#edit-membership").click(function() {
        $(this).parent().find("button").removeClass("active");
        $(this).toggleClass("active");
        $(".content-inside > div").removeClass("active");
        $(".edit-membership").addClass("active");
    });


    $(".al-experience  > .next-after").click(function() {
        $(".content-inside-al .left > div").find("button").removeClass("active");
        $('#al-privatemuseum').parent().addClass("active");
        $(".content-inside-al .right > div").removeClass("active");
        $(".al-privatemuseum").addClass("active");

    });

    $("#edit-payment").click(function() {
        $(this).parent().find("button").removeClass("active");
        $(this).toggleClass("active");
        $(".content-inside > div").removeClass("active");
        $(".edit-payment").addClass("active");
    });

    $("#edit-delete").click(function() {
        $(this).parent().find("button").removeClass("active");
        $(this).toggleClass("active");
        $(".content-inside > div").removeClass("active");
        $(".edit-delete").addClass("active");
    });


    $(".content-inside-al li button").click(function() {
        $(".content-inside-al li button").parent().removeClass("active");

        $(this).parent().addClass("active");

    });

    $("#al-experience").click(function() {
        $('.content-inside-al .left button').removeClass("active");
        $(this).addClass("active");

        $(".afterlogin-box .right > div").removeClass("active");
        $(".al-experience").addClass("active");
    });

    $(".al-experience   .next-after").click(function() {
        $(".content-inside-al .left > div").find("button").removeClass("active");
        $('#al-experience').parent().removeClass("active").addClass("blue").find("button").removeClass("active");
        $('#al-privatemuseum').addClass("active").parent().addClass("active");
        $(".content-inside-al .right > div").removeClass("active");
        $(".al-privatemuseum").addClass("active");
        $('.content-inside-al').addClass("line1");

    });

    $("#al-privatemuseum").click(function() {
        $('.content-inside-al .left button').removeClass("active");
        $(this).addClass("active");

        $(".afterlogin-box .right > div").removeClass("active");
        $(".al-privatemuseum").addClass("active");


    });


    $(".al-privatemuseum   .next-after").click(function() {
        $(".content-inside-al .left > div").find("button").removeClass("active");
        $('#al-privatemuseum').removeClass("active").parent().addClass("blue").removeClass("active");
        $('#al-privatemuseumname').addClass("active").parent().addClass("active");
        $(".content-inside-al .right > div").removeClass("active");
        $(".al-privatemuseumname").addClass("active");

        $('.content-inside-al').removeClass("line1");
        $('.content-inside-al').addClass("line2");

    });

    $("#al-privatemuseumname").click(function() {
        $('.content-inside-al .left button').removeClass("active");
        $(this).addClass("active");

        $(".afterlogin-box .right > div").removeClass("active");
        $(".al-privatemuseumname").addClass("active");
    });

    $(".al-privatemuseumname   .next-after").click(function() {
        $(".content-inside-al .left > div").find("button").removeClass("active");
        $('#al-privatemuseumname').removeClass("active").parent().addClass("blue").removeClass("active");
        $('#al-region').addClass("active").parent().addClass("active");
        $(".content-inside-al .right > div").removeClass("active");
        $(".al-region").addClass("active");

        $('.content-inside-al').removeClass("line2");
        $('.content-inside-al').addClass("line3");

    });

    $("#al-region").click(function() {
        $('.content-inside-al .left button').removeClass("active");
        $(this).addClass("active");

        $(".afterlogin-box .right > div").removeClass("active");
        $(".al-region").addClass("active");
    });


    $(".al-region   .next-after").click(function() {
        $(".content-inside-al .left > div").find("button").removeClass("active");
        $('#al-region').removeClass("active").parent().addClass("blue").removeClass("active");
        $('#al-movement').addClass("active").parent().addClass("active");
        $(".content-inside-al .right > div").removeClass("active");
        $(".al-movement").addClass("active");

        $('.content-inside-al').removeClass("line3");
        $('.content-inside-al').addClass("line4");

    });

    $("#al-movement").click(function() {
        $('.content-inside-al .left button').removeClass("active");
        $(this).addClass("active");

        $(".afterlogin-box .right > div").removeClass("active");
        $(".al-movement").addClass("active");
    });

    $(".al-movement   .next-after").click(function() {
        $(".content-inside-al .left > div").find("button").removeClass("active");
        $('#al-movement').removeClass("active").parent().addClass("blue").removeClass("active");
        $('#al-voicechat').addClass("active").parent().addClass("active");
        $(".content-inside-al .right > div").removeClass("active");
        $(".al-voicechat").addClass("active");

        $('.content-inside-al').removeClass("line4");
        $('.content-inside-al').addClass("line5");

    });

    $("#al-voicechat").click(function() {
        $('.content-inside-al .left button').removeClass("active");
        $(this).addClass("active");

        $(".afterlogin-box .right > div").removeClass("active");
        $(".al-voicechat").addClass("active");
    });


    $(".al-voicechat   .next-after").click(function() {
        $(".content-inside-al .left > div").find("button").removeClass("active");
        $('#al-voicechat').removeClass("active").parent().addClass("blue").removeClass("active");
        $('#al-microphone').addClass("active").parent().addClass("active");
        $(".content-inside-al .right > div").removeClass("active");
        $(".al-microphone").addClass("active");

        $('.content-inside-al').removeClass("line5");
        $('.content-inside-al').addClass("line6");

    });

    $("#al-microphone").click(function() {
        $('.content-inside-al .left button').removeClass("active");
        $(this).addClass("active");

        $(".afterlogin-box .right > div").removeClass("active");
        $(".al-microphone").addClass("active");
    });

    $(".al-microphone   .next-after").click(function() {
        $(".content-inside-al .left > div").find("button").removeClass("active");
        $('#al-microphone').removeClass("active").parent().addClass("blue").removeClass("active");
        $('#al-entermuseum').addClass("active").parent().addClass("active");
        $(".content-inside-al .right > div").removeClass("active");
        $(".al-entermuseum").addClass("active");

        $('.content-inside-al').removeClass("line6");
        $('.content-inside-al').addClass("line7");
    });

    $("#al-entermuseum").click(function() {
        $('.content-inside-al .left button').removeClass("active");
        $(this).addClass("active");

        $(".afterlogin-box .right > div").removeClass("active");
        $(".al-entermuseum").addClass("active");
    });
    $('#al-experience').addClass("active");

    class Slider {
        constructor(rangeElement, valueElement, options) {
            this.rangeElement = rangeElement
            this.valueElement = valueElement
            this.options = options

            // Attach a listener to "change" event
            this.rangeElement.addEventListener('input', this.updateSlider.bind(this))
        }

        // Initialize the slider
        init() {
            this.rangeElement.setAttribute('min', options.min)
            this.rangeElement.setAttribute('max', options.max)
            this.rangeElement.value = options.cur

            this.updateSlider()
        }

        // Format the money
        asMoney(value) {
            return '$' + parseFloat(value)
                .toLocaleString('en-US', { maximumFractionDigits: 2 })
        }

        generateBackground(rangeElement) {
            if (this.rangeElement.value === this.options.min) {
                return
            }

            let percentage = (this.rangeElement.value - this.options.min) / (this.options.max - this.options.min) * 100
            return 'background: linear-gradient(to right, #537df1, #537df1 ' + percentage + '%, #ffffff ' + percentage + '%, #ffffff 100%)'
        }

        updateSlider(newValue) {
            this.valueElement.innerHTML = this.asMoney(this.rangeElement.value)
            this.rangeElement.style = this.generateBackground(this.rangeElement.value)
        }
    }

    let rangeElement = document.querySelector('.range [type="range"]')
    let valueElement = document.querySelector('.range .range__value span')

    let options = {
        min: 0,
        max: 100,
        cur: 50
    }

    if (rangeElement) {
        let slider = new Slider(rangeElement, valueElement, options)

        slider.init()
    }
});