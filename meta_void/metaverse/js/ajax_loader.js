var ajaxLoader; // Public
jQuery(function($) {

    let scrollInitialized = false;
    ajaxLoader = {

        /**
         * Initialiser.
         */

        _xhr: null,
        initialized: false,

        init: function() {

            this.window = $(window);
            this.document = $(document);
            this.html = $('html');
            this.body = $('body');
            this.htmlbody = $('html,body');
            this.menu = $('#nav-main');
            this.header = $('#header');

            this.content = $('#ajaxmain');
            this.footer = $('#footer');
            this.scrollTop = this.document.scrollTop();
            this.windowSize = { width: this.window.width(), height: this.window.height() };
            this.isScrolling = false;
            this.baseUrl = window.location.origin;
            this.bodyClasses = {};

            this.currentLocation = "";
            this.oldLocation = "";

            // Globals to ensure ajax loads take X amount of time
            this.ajaxTimeout = 0;
            this.ajaxInterval = false;
            this.ajaxHash = false;

            // If the browser is a bad one!
            // if (!this.browserCheck()) {
            //     alert("Your browser is not supported by the " + productName + ". We recommend Google Chrome, Microsoft Edge, Brave or Mozilla Firefox.");
            // }

            if (this.mobileCheck()) ajaxLoader.body.addClass('isMobile');


            // Run methods that prep content when it's loaded.
            this.initPerPage();

            this.initAjax();

            //Init Accordeon
            this.document.on('click', '.accordion-title', this, function(e) {

                $(this).toggleClass('open');
                $accordion_content = $(this).next('.accordion-content');
                $('.accordion-content').not($accordion_content).slideUp();
                $('.accordion-content').not($accordion_content).prev('.accordion-title').removeClass('open');
                $accordion_content.stop(true, true).slideToggle(400);

            });

            $('.page').addClass('current-page');

            if (navigator.appVersion.indexOf("MSIE 10") !== -1) {
                this.html.addClass('ie10');
                ajaxLoader.body.addClass('animate-intro-out page-animate-in');

                setTimeout(function() {
                    ajaxLoader.body.addClass('intro-done');
                }, 1000);
            }

            if (!!window.MSInputMethodContext && !!document.documentMode) {
                this.html.addClass('ie11');
            }




            this.initialized = true;

        },

        browserCheck: function() {
            var name = "unknown-browser";

            if (navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("rv:11.0") != -1) {
                name = "msie";
                return false;
            } else if (navigator.userAgent.indexOf("Edge") != -1) {
                name = "microsoft-edge";
                return true;
            } else if (navigator.userAgent.indexOf("Firefox") != -1) {
                name = "firefox";
                return true;
            } else if (navigator.userAgent.indexOf("Opera") != -1) {
                name = "opera";
                return false;
            } else if (navigator.userAgent.indexOf("Chrome") != -1) {
                name = "chrome";
                return true;
            } else if (navigator.userAgent.indexOf("Safari") != -1) {
                name = "safari";
                return false;
            } else if (navigator.userAgent.indexOf("Brave") != -1) {
                name = "brave";
                return false;
            } else {
                return false;
            }
        },

        mobileCheck: function() {
            if (navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/webOS/i) ||
                navigator.userAgent.match(/iPhone/i) ||
                navigator.userAgent.match(/iPad/i) ||
                navigator.userAgent.match(/iPod/i) ||
                navigator.userAgent.match(/BlackBerry/i) ||
                navigator.userAgent.match(/Windows Phone/i)) {
                return true;
            } else {
                return false;
            }
        },

        /**
         * Initialiser for bits that need to be run for every new page.
         */

        initPerPage: function(page) {

            let simple_curr_page = "";


            page = (!page) ? ajaxLoader.content[0].querySelector('.page') : page[0];

            simple_curr_page = $(page).attr('id');

            if (!ajaxLoader.bodyClasses[simple_curr_page]) {
                console.log("replace");
                ajaxLoader.bodyClasses[simple_curr_page] = document.body.classList;
            }


            // ajaxLoader.log("New Page Loaded :" + simple_curr_page);
            ajaxLoader.loadLocation(page);

            //Set focus of unity canvas to false
            focusRedo = false;

            //Remove classes from stuff
            document.querySelector('body').classList.remove('inmuseum');
            document.querySelector('body').classList.remove('loginprocess');
            document.querySelector('body').classList.remove('startpage');
            document.querySelector('body').classList.remove('inProfile');

            ajaxLoader.scrollToTop();

            //Search all Input fields and reset them
            let allInputs = page.querySelectorAll('input');

            allInputs.forEach(element => {
                element.style = '';
            });

            let allInputFeedbacks = page.querySelectorAll('.inputFeedback');

            allInputFeedbacks.forEach(element => {
                element.innerHTML = '';
            });

            switch (simple_curr_page) {

                case "v":
                case "v-":
                case "v-scrolltop":
                    document.querySelector('body').classList.add('startpage');
                    ajaxLoader.InitScollMagic();
                    break;
                case "v-login-":
                    if (findGetParameter("verify")) {
                        OpenTab("", "verifyTab")
                    } else if (findGetParameter("forgot")) {
                        OpenTab("", "forgotpwTab")
                    } else if (findGetParameter("signup")) {
                        OpenTab("", "create1Tab")
                    } else if (findGetParameter("password")) {
                        OpenTab("", "create2Tab")
                    } else if (findGetParameter("profile")) {
                        OpenTab("", "profileTab")
                    } else {
                        OpenTab("", "signinTab")
                    }
                    document.querySelector('body').classList.add('loginprocess');
                    break;
                case "v-profil-edit-your-profile-":
                    if (auth.currentUser) {
                        OpenProfile("Profile")
                        LoadProfile();
                    } else {
                        fakeHref(document.location.origin + "/login/");
                    }
                    break;
                case "v-profil-edit-your-email-":
                    if (auth.currentUser) {
                        OpenProfile("Email");
                        LoadEmail();
                    } else {
                        fakeHref(document.location.origin + "/login/");
                    }
                    break;

                case "v-profil-edit-your-password-":
                    if (auth.currentUser) {
                        OpenProfile("PW");
                    } else {
                        fakeHref(document.location.origin + "/login/");
                    }
                    break;
                case "v-profil-delete-your-account-":
                    if (auth.currentUser) {
                        OpenProfile("Delete");
                        LoadDelete();
                    } else {
                        fakeHref(document.location.origin + "/login/");
                    }
                    break;
                case "v-profile-":
                    if (auth.currentUser) {
                        OpenProfile("Profile");
                        LoadProfile();
                        LoadEmail();
                        LoadDelete();
                    } else {
                        fakeHref(document.location.origin + "/login/");
                    }
                    break;
                case "v-" + hubLocation + "-":
                    if (findGetParameter("muid"))
                        StartupRoom(false);

                    focusRedo = true;

                    document.querySelector('body').classList.add('inmuseum');
                    break;
                case "v-meta-meet-art-":
                    // WaitForInitEvents();
                    InitEvents();
                    break;
                default:
                    break;

            }
            //Accordeons
            let $accordion_title = $(page).find(".js-accordion-title:first-of-type");
            $accordion_title.addClass("open");

            let $accordion_content = $accordion_title.next('.accordion-content');
            $('.accordion-content').not($accordion_content).slideUp();
            $('.accordion-content').not($accordion_content).prev('.accordion-title').removeClass('open');
            $accordion_content.stop(true, true).slideToggle(400);


            // Slick Slider Base
            let slickBase = {
                centerMode: true,
                centerPadding: '60px',
                slidesToShow: 2,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 2000,
                pauseOnHover: false,

                responsive: [{
                        breakpoint: 768,
                        settings: {

                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {

                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 1
                        }
                    }
                ]

            }

            ajaxLoader.initSlider(page, '.slider-slide', slickBase);

            //für peter
            let slickBasePotential = {

                infinite: true,
                speed: 300,
                slidesToShow: 1,
                fade: true,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: false,
                pauseOnHover: false,
            }

            ajaxLoader.initSlider(page, '.slider-fade', slickBasePotential);


        },

        initSlider: function(parent, slider, data) {

            let allSlider = $(parent).find(slider);

            for (let i = 0; i < allSlider.length; i++) {

                if ($(allSlider[i]).hasClass("slick-initialized")) {
                    console.log("slider already initialized");
                    $(allSlider[i]).slick('destroy');
                }
                console.log(data);
                $(allSlider[i]).slick(data);
            }
        },

        InitScollMagic: function() {

            let bgContainer = document.querySelector(".background-container");

            if (bgContainer == null)
                return;

            bgContainer.style.width = "100%";

            if (scrollInitialized)
                return;


            // Init ScrollMagic
            var controller = new ScrollMagic.Controller();

            // Scene intro - pin the intro section
            var tween = TweenMax.to(".background-container", 1, { scale: 1.9, x: "-33%", opacity: 1, ease: Linear.easeNone });

            var pinSceneIntro = new ScrollMagic.Scene({
                    triggerElement: '#intro',
                    triggerHook: 0,
                    duration: '100%'
                })
                .setTween(tween)
                .setPin('#intro .background-container')

            .addTo(controller);

            // Scene 1 - pin the second section
            var pinScene01 = new ScrollMagic.Scene({
                    triggerElement: '#slide01',
                    triggerHook: 0,
                    duration: '200%'
                })
                .setPin('#slide01 .pin-wrapper')

            .addTo(controller);

            // console.log(controller);


            scrollInitialized = true;
        },


        /**
         * Init Ajax content loading between pages
         */
        initAjax: function() {

            // Don't bother with browsers that don't support document origin or history
            if (document.location.origin === undefined || typeof history.pushState === undefined) {
                return;
            }


            this.document.on('mousedown', 'a[href^="' + document.location.origin + '"]:not([target="_blank"])', this, function(e) {
                var href = $(this).attr('href');
                console.log(href);
                if (href == window.location.origin + "/" + hubLocation + "/" ||
                    href == window.location.origin + "/" + hubLocation + ""
                ) {
                    FocusRoom(true);
                    focusRedo = true;

                } else {
                    UnfocusRoom();
                }
            });

            // Clicking pages within this site should load them with ajax
            this.document.on('click', 'a[href^="' + document.location.origin + '"]:not([target="_blank"])', this, function(e) {

                var clicked_link = $(this);
                // console.log(e.target.hasAttribute('download'));
                // var fileInfo = new FileInfo(clicked_link[0].href);

                // Sometimes we don't want ajax
                if (clicked_link.parents('#wpadminbar').length > 0 || e.target.hasAttribute('download')) {
                    return;
                }

                // Don't do whatever the default is
                e.preventDefault();

                // Sometimes we gotta wait for hover on mobiles
                if ((ajaxLoader.html.hasClass('mobile') || ajaxLoader.html.hasClass('tablet')) && clicked_link.hasClass('touch-hover')) {

                    if (clicked_link.hasClass('touch-hovered')) {
                        $('.touch-hovered').removeClass('touch-hovered');
                    } else {
                        clicked_link.addClass('touch-hovered');
                        $('.touch-hovered').not(clicked_link).removeClass('touch-hovered');
                        return false;
                    }
                }

                // Unfocus link
                clicked_link.blur();
                ajaxLoader.menu.trigger('mouseleave');

                // Shut the menu
                ajaxLoader.html.removeClass('nav-main-open');

                // Sometimes this is an anchor link and we need to programmatically scroll down to the section
                var href = $(this).attr('href');
                var hash = href.indexOf('#') > 0 ? href.substring(href.indexOf('#')) : false;
                var target = hash ? $('.current-page').find(hash) : false;



                // Don't load the page, our target is already here
                if (target.length) {
                    $('body,html').stop().animate({ 'scrollTop': target.offset().top }, 800, 'swelling');
                    return false;
                }

                // Store the hash in case we need to scroll down to it on the new page
                ajaxLoader.ajaxHash = hash;

                // Scroll to top
                ajaxLoader.scrollToTop();

                // On the home page already, scroll to top
                if (clicked_link.parents('#site-title').length > 0 && e.data.content.find('.page.current-page').hasClass('home')) {
                    return;
                }

                // Add a loading class
                ajaxLoader.body.addClass('ajax-loading page-animate-out').removeClass('page-animate-in');

                // Load the page
                href = hash ? href.replace(hash, '') : href;
                e.data.loadHref(href, function(current_page, new_page) {
                    // Update the history
                    if (clicked_link[0].parentElement.classList.contains('nohistory')) {
                        // ajaxLoader.log("no history");
                        window.history.replaceState(null, null, href);

                    } else {

                        history.pushState({}, '', href);
                    }

                    ajaxLoader._initBackButtonHandling();

                    // Remove loading class
                    ajaxLoader.body.removeClass('ajax-loading');

                    // Make the transition happen
                    ajaxLoader.transition(current_page, new_page);

                }, function() {

                    // Remove loading class
                    ajaxLoader.body.removeClass('ajax-loading');

                });

            });

        },

        loadLocation: function(page) {
            var _title = $(page).attr('data-title') || productName;
            document.title = productName + ' | ' + _title;
            // ajaxLoader.log($('#location'));
            $('#location').html(_title);

            var _parent = $(page).attr('data-parent') ? $(page).attr('data-parent') + "<span>▸</span>" : '';

            $('#locationparent').html(_parent);
            $('#locationparent').attr("href", this.baseUrl + '/' + $(page).attr('data-parent'));


        },

        /**
         * Load a page using ajax, and switch to it.
         *
         * @param string $href The URL to load.
         * @param function $completion Function to be run when the page load succeeds. If implemented, you will need
         *		to implement the hiding of the old page and the showing of the new page.
         * @param function $failure Function to be run when the page load fails.
         * @return xhr
         */

        loadHref: function(href, completion, failure) {
            console.log('Loading: ' + href + "from" + window.location.href);

            if (window.location.href != this.baseUrl + "/login/" &&
                window.location.href != this.baseUrl + "/login/?default" &&
                window.location.href != this.baseUrl + "/login/?verify" &&
                window.location.href != this.baseUrl + "/login/?profile" &&
                window.location.href != this.baseUrl + "/login/?signup" &&
                window.location.href != this.baseUrl + "/login/?password") {

                this.oldLocation = window.location.href;
            }

            // Internal completion callback
            var _completion = function(current_page, new_page) {

                // Call the completion callback
                if (typeof completion === 'function') {
                    completion(current_page, new_page);
                } else {
                    // Update the history
                    history.pushState({}, '', href);

                    ajaxLoader._initBackButtonHandling();

                    // Make the transition happen
                    ajaxLoader.transition(current_page, new_page);
                }

                // Update the page title¨
                ajaxLoader.loadLocation(new_page);

                // Track the page view
                if (typeof window._gaq !== 'undefined' && typeof window._gaq.push === 'function') {
                    window._gaq.push(['_trackPageview', href]);
                }

                //TODO: REadd Hash

                // Mark the current page
                current_page.removeClass('current-page');
                new_page.addClass('current-page');
                ajaxLoader.menu.find('li').removeClass('active current_page_item current_page_ancestor current_page_parent');

                var split_href = href.replace(this.baseUrl, '').split('/');
                var slug = split_href[0];
                ajaxLoader.menu.find('a[href="' + this.baseUrl + (slug ? slug + '/' : '') + '"]').parent().addClass('active-item');

                // Check hash to scroll to
                if (ajaxLoader.ajaxHash && new_page.find(ajaxLoader.ajaxHash).length) {
                    $('body,html').stop().animate({ 'scrollTop': new_page.find(ajaxLoader.ajaxHash).offset().top }, 800, 'swelling');
                }
            };

            // Internal completion callback
            var _failure = function() {
                if (typeof failure === 'function') {
                    failure(href);
                }
                console.log("internal failed. This can be a double click issue");
                // document.location = href;
            };

            // Create our version of the page key before we mess with the href
            var page_key = href.replace(/\W+/g, '-');

            // Separate the query string
            var url = href,
                data = null;
            var index = href.indexOf('?');
            if (index !== -1) {
                data = href.substring(index + 1);
                url = href.substring(0, index);
            }

            var simple_page_key = url.replace(window.location.origin, 'v').replace(/\W+/g, '-');


            // Cancel any existing XHR requests
            console.log(this._xhr);
            if (this._xhr !== null) {
                this._xhr.abort();
            }

            // If the page exists for the same key, just show it
            var existing_page = this.content.find('.page[id="' + simple_page_key + '"]');
            if (existing_page.length) {

                if (!existing_page.hasClass('current-page')) {
                    // ajaxLoader.log('CACHED');
                    ajaxLoader.body.removeClass('ajax-loading');
                    setTimeout(function() {
                        _completion(ajaxLoader.content.find('.page.current-page'), existing_page);
                    }, 300);
                } else {
                    // ajaxLoader.log('CURRENT PAGE');
                    ajaxLoader.body.removeClass('ajax-loading');
                    _completion(ajaxLoader.content.find('.page.current-page'), existing_page);

                    if (typeof failure === 'function') {
                        failure(href);
                    }
                }
                ajaxLoader.removeBodyClasses();
                //Cleanup classes
                if (ajaxLoader.bodyClasses[simple_page_key]) {
                    ajaxLoader.addBodyClasses(ajaxLoader.bodyClasses[simple_page_key]);
                } else {
                    console.log("no body class for " + simple_page_key);
                }

                return;
            }

            ajaxLoader.ajaxTimeout = 0;
            ajaxLoader.ajaxInterval = setInterval(function() {
                ajaxLoader.ajaxTimeout += 10;
            }, 10);

            this._xhr = $.ajax({
                url: url,
                data: data,
                type: 'GET',
                dataType: 'html',
                context: this,
                success: function(data) {

                    // Get our pages
                    var new_page = $(data).wrap('<div>').parent().find('.page').css({ position: 'absolute', opacity: 0, zIndex: -1 }).attr('id', simple_page_key);

                    var data = data.replace('<body', '<body><div id="body"').replace('</body>', '</div></body>');

                    // Remove any existing body classes
                    ajaxLoader.removeBodyClasses();

                    console.log("/////////////////");


                    var pages = ajaxLoader.content.find('.page');

                    // Replace the existing page with the same position
                    var existing_page = pages.filter('[id="' + simple_page_key + '"]');
                    if (existing_page.length) {
                        existing_page.replaceWith(new_page);
                    }

                    // Inject the page
                    else {
                        ajaxLoader.content.append(new_page);
                    }

                    // Grab the current page
                    var current_page = pages.filter('.current-page');

                    // Run any initialisation that needs to be run
                    new_page.css({ position: '', opacity: '', zIndex: '', display: 'none' });


                    //Add new body classes
                    var bodyClasses = $(data).filter('#body').attr('class').split(' ');
                    ajaxLoader.bodyClasses[simple_page_key] = bodyClasses;

                    ajaxLoader.addBodyClasses(bodyClasses);

                    // Ensure we've waited enough time for the animation out before loading new AJAX content
                    var successTimeout = setInterval(function() {

                        // if (( ajaxLoader.ajaxTimeout > 300 && ajaxLoader.ajaxTimeout % 1500 < 200) || (ajaxLoader.html.hasClass('no-3d') && ajaxLoader.ajaxTimeout > 300)) {
                        if (ajaxLoader.ajaxTimeout > 300) {
                            clearInterval(ajaxLoader.ajaxInterval);

                            // Run the internal completion
                            _completion(current_page, new_page);

                            clearInterval(successTimeout);
                        }

                    }, 50);
                },
                error: function(error) {
                    _failure();
                    console.log("error??")
                    console.log(error);
                }
            });

            // Return the XHR
            return this._xhr;
        },

        /**
         * Scroll to the top of the page.
         *
         * @param function $callback Function to be run when the page has finished scrolling.
         * @return void
         */
        scrollToTop: function(callback) {
            var current_page = this.content.find('.page:visible()');
            var offset = 0;

            // Already at the top
            if (this.scrollTop <= offset) {
                if (typeof callback === 'function') {
                    callback();
                }
                return;
            }

            // Remove the body class if we click outside the menu
            this.htmlbody.animate({ scrollTop: 0 }, 800, callback);
        },

        _initBackButtonHandling: function() {
            focusRedo = true;
            // We've already attached
            var events = $._data(this.window[0], 'events');
            if (events.popstate !== undefined && events.popstate.length) {
                return;
            }

            // Load pages when we go back through the browser history
            // ajaxLoader.log('Binding popstate handler¦');
            this.window.on('popstate', this, function(e) {
                // Do nothing when we get back to the original page
                if (e.originalEvent.state === null) {
                    // ajaxLoader.log( 'Unbinding popstate handlerâ€¦' );
                    e.data.window.off('popstate');
                }

                // Load the page
                var href = location.href;
                ajaxLoader.loadHref(href, function(current_page, new_page) {
                    ajaxLoader.transition(current_page, new_page);
                });
            });
        },

        //
        // PAGE TRANSITIONS
        //

        /**
         * Simple transition between pages
         */

        transition: function(current_page, new_page) {

            // Add in new_page
            current_page.add(new_page);

            // hide current page
            new_page.css({ display: '' });
            new_page.siblings(':visible').css({ display: 'none' });

            ajaxLoader.body.removeClass('ajax-loading page-animate-out');

            // Remove current page and add the new id to the body
            document.body.classList.add(new_page.id);
            document.body.classList.remove(current_page.id);

            // trigger blocks to animate in
            setTimeout(function() {
                ajaxLoader.initPerPage(new_page);
                ajaxLoader.body.addClass('page-animate-in');
                ajaxLoader.document.trigger('scroll');
                ajaxLoader.window.trigger('resize');

                setTimeout(function() {
                    ajaxLoader.document.trigger('scroll');
                    ajaxLoader.window.trigger('resize');
                }, 300);

            }, 10);
        },

        getBodyClasses: function(element) {
            return (element.substring(0, 4) == 'home' ||
                element.substring(0, 4) == 'page' ||
                element.substring(0, 6) == 'single' ||
                element.substring(0, 7) == 'single-' ||
                element.substring(0, 6) == 'postid');
        },

        removeBodyClasses: function() {
            document.body.classList.forEach(element => {
                console.log(element);
                if (ajaxLoader.getBodyClasses(element)) {
                    document.body.classList.remove(element);
                    console.log("remove " + element);
                } else {
                    console.log("keep class " + element);

                }
            });
        },

        addBodyClasses: function(classesToAdd) {
            classesToAdd.forEach(element => {

                if (ajaxLoader.getBodyClasses(element)) {
                    document.body.classList.add(element);
                    console.log("add " + element);
                } else {
                    console.log("don't add " + element);
                }
            });
        },

        //
        // UTILITIES
        //

        /**
         * Log a message to the console (without those nasty lint warnings).
         *
         * @param mixed $message The object to log to the console.
         * @return void
         */

        log: function(message) {
            // return;
            if (typeof window.console.log === 'function') {
                window.console.log(message);
            }
        },
    };

    /**
     * Run the initialiser in app.js to wait for auth
     */
    $(document).ready(function() {
        // ajaxLoader.init();
    });

});