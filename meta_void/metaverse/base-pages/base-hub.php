<!-- Museums Loader-->
<div class="page content home loginpage" data-title="<?php the_field('hub_title', 'options'); ?>" id="hub-page">
    <div id="vizzard" class="choose-experience" style="right:0">

        <div class="museumbox museum center">
            <h1 class=" center ">Select your Experience</h1>
            <img class="verlauf center klein" src="<?php echo get_template_directory_uri(); ?>/images/verlauf.png">
            <br /><br /><br />

            <div class="flex">
                <div>
                    <div style="background-image: url(<?php the_field('museum_image'); ?>)">
                        <div class="con-mus">
                            <h3><?php the_field('museum_titel'); ?></h3>
                            <p><?php the_field('museum_text'); ?></p>

                        </div>
                        <div class="profileLoggedIn">
                            <button class="button-museum" onclick="StartupRoom(false);"><?php the_field('museum_button'); ?></button>
                        </div>
                        <div class="profileLoggedOut">
                            <a href="<?php echo get_home_url(); ?>/login/">
                                <button class="button-museum">Login</button>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="profileLoggedIn">
                    <div>
                        <div style="background-image: url(<?php the_field('metameet_image'); ?>)">
                            <div class="con-mus">
                                <h3><?php the_field('metameet_titel'); ?></h3>
                                <p><?php the_field('metameet_text'); ?></p>
                            </div>
                            <a class="button-museum" href="<?php echo get_home_url(); ?>/<?php the_field('meet_url', 'options'); ?>/">
                                <?php the_field('metameet_button'); ?>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div id="gatherWarning">
        You are going to be teleported to the moderator. Please wait. Grab a towel and don't panic.
    </div>
    <div class="header-loadmuseum" style="right:0">
        <div class="contentstars">
            <div class="stars"></div>
            <div class="twinkling"></div>
            <div class="sterne-blau"></div>
            <div class="starstitle">
                <img class="vimu" id="home-vimu" src="<?php the_field('logo_loading', 'options'); ?>">

            </div>
        </div>
        <div class="footer nav">
            <div class="download-bar">
                <span id="downloadInfo">Downloading the <?php the_field('hub_title', 'options'); ?></span><br>
                <div>
                    <div id="bar" class="bar"></div>
                </div>
            </div>
            <div class="center">
                <p>Please wait while the <?php the_field('hub_title', 'options'); ?> is <?php the_field('loading', 'options'); ?></p>
            </div>
            <div class="right">
                <p><?php the_field('company', 'options'); ?></p>

            </div>
        </div>
    </div>
    <!-- Museum -->
    <div id="screenMuseum">
        <div id="unity-container" class="unity-desktop">
            <div id="unity-loading-bar">
                <div id="unity-logo"></div>
                <div id="unity-progress-bar-empty">
                    <div id="unity-progress-bar-full"></div>
                </div>
                <div id="unity-progress-text">
                    loading... please be patient.
                </div>
            </div>
            <canvas id="unity-canvas" width=1280 height=720></canvas>
            <div id="unity-mobile-warning" style="display: none;">
                WebGL builds are not supported on mobile devices.
            </div>
            <div id="unity-footer">
                <div id="unity-build-title" style="display: none;"><?php the_field('hub_title', 'options'); ?></div>
            </div>
        </div>
    </div>
</div>
<!-- </div> -->

<?php get_footer('');  ?>