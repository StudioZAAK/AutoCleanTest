<?php

/**     Template Name: _home  */  get_header(); ?>


<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>

        <!-- Create the content -->
        <div class="page content home" data-title="Welcome" id="page-home">
            <div id="scrolltop"></div>

            <?php if (have_rows('block')) : ?>
                <div class="blocks-home">
                    <?php while (have_rows('block')) : the_row(); ?>

                        <?php if (get_row_layout() == 'header_video') :   ?>
                            <div class="fullscreen">

                                <div class="wrapper">


                                    <iframe src="https://player.vimeo.com/video/799383771?h=06adbe2124&background=1&autoplay=1&loop=1&byline=0&title=0" width="640" height="360" allowfullscreen="true" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

                                </div>

                                <div class="textbox">
                                    <h2 class="uber"><?php the_sub_field('ubertitel') ?></h2>
                                    <h1 class=""><?php the_sub_field('titel') ?></h1>
                                    <?php the_sub_field('content') ?><br /><br /><br />

                                    <div class="profileLoggedIn">
                                        <a href="<?php echo get_home_url(); ?>/<?php the_field('hub_url', 'options'); ?>/">

                                            <button id="enterMuseumButton">Visit the <?php the_field('hub_title', 'options'); ?></button>
                                        </a>
                                    </div>
                                    <div class="profileLoggedOut">
                                        <a href="<?php echo get_home_url(); ?>/login/">
                                            <button id="enterMuseumButton">Visit the <?php the_field('hub_title', 'options'); ?></button>
                                        </a>
                                    </div>

                                </div>

                            </div>

                            <img class="rund-top" src="<?php echo get_template_directory_uri(); ?>/images/rund-top.svg">



                        <?php elseif (get_row_layout() == 'header_image') :   ?>

                            <div id="main" class="main-container">


                                <div class="fullscreen">

                                    <div class="wrapper">


                                        <?php $img_acf = get_sub_field('image'); ?>
                                        <picture>
                                            <source srcset="<?php echo  $img_acf['sizes']['bg-b'] ?> 2x" media="(min-width: 951px)" />
                                            <source srcset="<?php echo  $img_acf['sizes']['bg-b'] ?> 1x" media="(min-width: 951px)" />
                                            <source srcset="<?php echo  $img_acf['sizes']['bg-m'] ?> 2x" media="(min-width: 501px)" />
                                            <source srmcset="<?php echo  $img_acf['sizes']['bg-m'] ?> 2x" media="(min-width: 501px)" />
                                            <source srcset="<?php echo  $img_acf['sizes']['bg-s'] ?> 1x" media="(min-width: 1px)" />
                                            <img class="fullimage" src="<?php echo  $img_acf['sizes']['bg-s'] ?>" />
                                        </picture>

                                    </div>
                                    <div class="textbox">
                                        <h2 class="uber"><?php the_sub_field('ubertitel') ?></h2>
                                        <h1 class=""><?php the_sub_field('titel') ?></h1>
                                        <?php the_sub_field('content') ?><br /><br />

                                        <a href="<?php echo get_home_url(); ?>/<?php the_field('hub_url', 'options'); ?>/">
                                            <button id="enterMuseumButton">Visit the <?php the_field('hub_title', 'options'); ?></button>
                                        </a>


                                    </div>

                                </div>

                                <img class="rund-top" src="<?php echo get_template_directory_uri(); ?>/images/rund-top.svg">






                            </div>



                        <?php elseif (get_row_layout() == 'einleitung') :   ?>




                            <div class="einleitung section">
                                <div class="content-inn">
                                    <div class="flex zwei">

                                        <div class="textbox">
                                            <h4 class="uber"><?php the_sub_field('ubertitel') ?></h4>
                                            <h2 class=""><?php the_sub_field('titel') ?></h2>
                                            <?php the_sub_field('content') ?>
                                        </div>


                                        <div class="imagebox">
                                            <?php $img_acf = get_sub_field('image'); ?>
                                            <picture>
                                                <source srcset="<?php echo  $img_acf['sizes']['quer-m'] ?> 2x" media="(min-width: 951px)" />
                                                <source srcset="<?php echo  $img_acf['sizes']['quer-m'] ?> 1x" media="(min-width: 951px)" />
                                                <source srcset="<?php echo  $img_acf['sizes']['quer-m'] ?> 2x" media="(min-width: 501px)" />
                                                <source srmcset="<?php echo  $img_acf['sizes']['quer-m'] ?> 2x" media="(min-width: 501px)" />
                                                <source srcset="<?php echo  $img_acf['sizes']['quer-m'] ?> 1x" media="(min-width: 1px)" />
                                                <img src="<?php echo  $img_acf['sizes']['quer-m'] ?>" />
                                            </picture>
                                            <p class="legende"><?php the_sub_field('legende_bild') ?></p>
                                        </div>
                                    </div>
                                </div>
                            </div>






                        <?php elseif (get_row_layout() == 'slider') :   ?>

                            <div class="slider-box-slide section hell">
                                <div class="content-inn">
                                    <div class="flex zwei">

                                        <div class="textbox">
                                            <h4 class="uber"><?php the_sub_field('ubertitel') ?></h4>
                                            <h2 class=""><?php the_sub_field('titel') ?></h2>
                                            <?php the_sub_field('content') ?>
                                        </div>

                                        <?php if (have_rows('Slider')) : ?>
                                            <div class="slider-slide">
                                                <?php while (have_rows('Slider')) : the_row(); ?>
                                                    <div>
                                                        <div>
                                                            <?php $img_acf = get_sub_field('image'); ?>
                                                            <picture>
                                                                <source srcset="<?php echo  $img_acf['sizes']['hoch-m'] ?> 2x" media="(min-width: 951px)" />
                                                                <source srcset="<?php echo  $img_acf['sizes']['hoch-m'] ?> 1x" media="(min-width: 951px)" />
                                                                <source srcset="<?php echo  $img_acf['sizes']['hoch-m'] ?> 2x" media="(min-width: 501px)" />
                                                                <source srmcset="<?php echo  $img_acf['sizes']['hoch-m'] ?> 2x" media="(min-width: 501px)" />
                                                                <source srcset="<?php echo  $img_acf['sizes']['hoch-m'] ?> 1x" media="(min-width: 1px)" />
                                                                <img src="<?php echo  $img_acf['sizes']['hoch-m'] ?>" />
                                                            </picture>
                                                        </div>
                                                        <h3 class="sliderfont"><?php the_sub_field('titel') ?></h3>
                                                    </div>
                                                <?php endwhile; ?>
                                            <?php endif;  ?>
                                            </div>
                                    </div>
                                </div>
                            </div>



                        <?php elseif (get_row_layout() == 'slider_left') :   ?>

                            <div class="slider-box-slide section dark">
                                <div class="content-inn">
                                    <div class="flex zwei">



                                        <?php if (have_rows('Slider')) : ?>
                                            <div class="slider-fade">
                                                <?php while (have_rows('Slider')) : the_row(); ?>
                                                    <div>
                                                        <div>
                                                            <?php $img_acf = get_sub_field('image'); ?>
                                                            <picture>
                                                                <source srcset="<?php echo  $img_acf['sizes']['quer-m'] ?> 2x" media="(min-width: 951px)" />
                                                                <source srcset="<?php echo  $img_acf['sizes']['quer-m'] ?> 1x" media="(min-width: 951px)" />
                                                                <source srcset="<?php echo  $img_acf['sizes']['quer-m'] ?> 2x" media="(min-width: 501px)" />
                                                                <source srmcset="<?php echo  $img_acf['sizes']['quer-m'] ?> 2x" media="(min-width: 501px)" />
                                                                <source srcset="<?php echo  $img_acf['sizes']['quer-m'] ?> 1x" media="(min-width: 1px)" />
                                                                <img src="<?php echo  $img_acf['sizes']['quer-m'] ?>" />
                                                            </picture>
                                                        </div>
                                                        <h3 class="sliderfont"><?php the_sub_field('titel') ?></h3>
                                                    </div>
                                                <?php endwhile; ?>
                                            <?php endif;  ?>
                                            </div>

                                            <div class="textbox">
                                                <h4 class="uber"><?php the_sub_field('ubertitel') ?></h4>
                                                <h2 class=""><?php the_sub_field('titel') ?></h2>
                                                <?php the_sub_field('content') ?>
                                            </div>


                                    </div>
                                </div>
                            </div>




                        <?php elseif (get_row_layout() == 'login') :   ?>

                            <div class="section login">
                                <div class="content-inn">
                                    <div class="flex drei">



                                        <div class="register-box">
                                            <?php the_field('regisiter_text', 'option') ?><br />
                                            <a class="button blue full" href="<?php echo get_home_url(); ?>/login/?signup">Sign up</a>

                                        </div>



                                        <div class="login-box">
                                            <h3>LOGIN</h3>
                                            <form class="signinForm" onsubmit="return false">
                                                <div class="fieldbox">
                                                    <label class="inputTitle">Email address</label>
                                                    <input class="mdl-textfield__input" autofocus autocomplete style="display:inline;width:auto;" tabindex="1" type="text" id="email" name="email" placeholder="Email" />
                                                </div>
                                                <br />
                                                <div class="fieldbox">
                                                    <label class="floatleft inputTitle">Password</label>
                                                    <a href="<?php echo get_home_url(); ?>/login/?forgot">
                                                        <div class="forgotpassword">Forgot Password</div>
                                                    </a>
                                                    <input class="mdl-textfield__input pwToggle" autofocus autocomplete style="display:inline;width:auto;" tabindex="2" type="password" id="password" name="password" placeholder="Password" />
                                                </div>
                                                <br />

                                                <div class="flex doppel fieldbox" style="width:unset">
                                                    <label class="containerradio"> Show password
                                                        <input type="checkbox" onclick="TogglePW(this)">
                                                        <span class="checkmark" style="cursor:pointer;"></span>
                                                    </label>
                                                </div>
                                                <br /> <br /> <br />
                                                <button class="button blue full login" autofocus type="submit" onclick="SignIn()">Login</button>
                                            </form>

                                            <div class="line light"></div>
                                            <p class="center">Sign in with</p>
                                            <div id="noSocial">
                                                <div class="social">

                                                    <div class="tile">
                                                        <button class="button-game google" onclick="SignInProvider('google')">
                                                            <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/google.svg" alt="Sigin Google">
                                                        </button>
                                                        <label>Google</label>
                                                    </div>
                                                    <div class="tile">
                                                        <button class="button-game facebook" onclick="SignInProvider('facebook')">
                                                            <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/facebook.svg" alt="Sigin Facebook">
                                                        </button>
                                                        <label>Facebook</label>
                                                    </div>
                                                    <div class="tile">
                                                        <button class="button-game apple" onclick="SignInProvider('apple')">
                                                            <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/apple.svg" alt="Sigin Apple">
                                                        </button>
                                                        <label>Apple</label>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>




                                        <div class="anonym-box">
                                            ANONYM
                                            <div>
                                                <label class="inputTitle">First name</label>
                                                <input type="text" id="fname" onchange="CleanInput(this)" value="">
                                                <div class="inputverify"></div>
                                            </div>
                                            <br />
                                            <div>
                                                <label class="inputTitle">Last name</label>
                                                <input type="text" id="lname" onchange="CleanInput(this)" value="">
                                                <div class="inputverify"></div>
                                            </div>
                                            <br />

                                            <div class="tile">
                                                <button class="button blue full login" onclick="SignUpAnonym()">VISIT ANONYM</button>

                                            </div>
                                        </div>



                                    </div>








                                    <div id="signinTab" class="login-form home" style="display:block">
                                        <h2 class="titlesmal">Sign in to your account</h2>
                                        <p class="" id="Welcome">Welcome! Are you new here? <button class="signup button transparent" onclick="OpenTab('signinTab','create1Tab')">Sign up</button> instead.</p>
                                        <div class="line light"></div>
                                        <p class="center">Sign in with</p>
                                        <div id="noSocial">
                                            <div class="social">
                                                <div class="tool" style="justify-content: center;">
                                                    <div class="tile">
                                                        <button class="button-game google" onclick="SignInProvider('google')">
                                                            <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/google.svg" alt="Sigin Google">
                                                        </button>
                                                        <label>Google</label>
                                                    </div>
                                                    <div class="tile">
                                                        <button class="button-game facebook" onclick="SignInProvider('facebook')">
                                                            <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/facebook.svg" alt="Sigin Facebook">
                                                        </button>
                                                        <label>Facebook</label>
                                                    </div>
                                                    <div class="tile">
                                                        <button class="button-game apple" onclick="SignInProvider('apple')">
                                                            <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/apple.svg" alt="Sigin Apple">
                                                        </button>
                                                        <label>Apple</label>
                                                    </div>
                                                    <div class="tile">
                                                        <button class="button-game" onclick="SignUpAnonym()">
                                                            <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/apple.svg" alt="Sigin Anon">
                                                        </button>
                                                        <label>Anonym</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="line">
                                                <div class="or">OR</div>
                                            </div>
                                        </div>
                                        <form class="signinForm" onsubmit="return false">
                                            <div class="fieldbox">
                                                <label class="inputTitle">Email address</label>
                                                <input class="mdl-textfield__input" autofocus autocomplete style="display:inline;width:auto;" tabindex="1" type="text" id="email" name="email" placeholder="Email" />
                                            </div>
                                            <br />
                                            <div class="fieldbox">
                                                <label class="floatleft inputTitle">Password</label>
                                                <a href="<?php echo get_home_url(); ?>/login/?forgot">
                                                    <div class="forgotpassword">Forgot Password</div>
                                                </a>
                                                <input class="mdl-textfield__input pwToggle" autofocus autocomplete style="display:inline;width:auto;" tabindex="2" type="password" id="password" name="password" placeholder="Password" />
                                            </div>
                                            <br />

                                            <div class="flex doppel fieldbox" style="width:unset">
                                                <label class="containerradio"> Show password
                                                    <input type="checkbox" onclick="TogglePW(this)">
                                                    <span class="checkmark" style="cursor:pointer;"></span>
                                                </label>
                                            </div>
                                            <br /> <br /> <br />
                                            <button class="button blue full login" autofocus type="submit" onclick="SignIn()">Login</button>
                                        </form>

                                        <ul class="inputFeedback" id="newEmailFeedback">
                                        </ul>
                                        <br /> <br />

                                    </div>
                                </div>
                            </div>




                        <?php elseif (get_row_layout() == 'potential') :   ?>

                            <div class="slider-box-fade section">
                                <div class="content-inn">
                                    <div class="flex zwei">



                                        <?php if (have_rows('Slider')) : ?>
                                            <div class="slider-fade">
                                                <?php while (have_rows('Slider')) : the_row(); ?>
                                                    <div>

                                                        <?php $img_acf = get_sub_field('image'); ?>
                                                        <picture>
                                                            <source srcset="<?php echo  $img_acf['sizes']['quad-m'] ?> 2x" media="(min-width: 951px)" />
                                                            <source srcset="<?php echo  $img_acf['sizes']['quad-m'] ?> 1x" media="(min-width: 951px)" />
                                                            <source srcset="<?php echo  $img_acf['sizes']['quad-m'] ?> 2x" media="(min-width: 501px)" />
                                                            <source srmcset="<?php echo  $img_acf['sizes']['quad-m'] ?> 2x" media="(min-width: 501px)" />
                                                            <source srcset="<?php echo  $img_acf['sizes']['quad-m'] ?> 1x" media="(min-width: 1px)" />
                                                            <img src="<?php echo  $img_acf['sizes']['quad-m'] ?>" />
                                                        </picture>
                                                    </div>
                                                <?php endwhile; ?>
                                            </div>
                                        <?php endif;  ?>

                                        <div class="textbox">
                                            <h4 class="uber"><?php the_sub_field('ubertitel') ?></h4>
                                            <h2 class=""><?php the_sub_field('titel') ?></h2>
                                            <?php the_sub_field('content') ?>
                                        </div>


                                    </div>
                                </div>
                            </div>


                        <?php elseif (get_row_layout() == 'footer') :   ?>

                            <footer class="content-inn">
                                <div class="footer-box">
                                    <h2 class="klein"><?php the_field('footer_titel', 'option'); ?></h2>

                                    <div class="flex drei">
                                        <div>
                                            <?php the_field('footer', 'option'); ?>
                                        </div>

                                        <div>
                                            <?php $img_acf = get_field('standort', 'option'); ?>
                                            <picture>
                                                <source srcset="<?php echo  $img_acf['sizes']['quad-m'] ?> 2x" media="(min-width: 951px)" />
                                                <source srcset="<?php echo  $img_acf['sizes']['quad-m'] ?> 1x" media="(min-width: 951px)" />
                                                <source srcset="<?php echo  $img_acf['sizes']['quad-m'] ?> 2x" media="(min-width: 501px)" />
                                                <source srmcset="<?php echo  $img_acf['sizes']['quad-m'] ?> 2x" media="(min-width: 501px)" />
                                                <source srcset="<?php echo  $img_acf['sizes']['quad-m'] ?> 1x" media="(min-width: 1px)" />
                                                <img src="<?php echo  $img_acf['sizes']['quad-m'] ?>" />
                                            </picture>
                                        </div>

                                        <div>
                                            <?php the_field('adresse', 'option'); ?>
                                        </div>
                                    </div>

                                </div>
                            </footer>
                            <div class="footerpadding"></div>


                        <?php elseif (get_row_layout() == 'slide_video') :   ?>

                            <div>
                                <div class="full content">
                                    <?php the_sub_field('iframe') ?>

                                </div>
                            </div>
                        <?php endif; ?>
                    <?php endwhile; ?>
                </div>
            <?php endif; ?>







        </div><!-- content-->
    <?php endwhile; ?>
<?php endif; // post 
?>
<?php get_footer();  ?>