<div class="page content home loginpage" data-title="Login" id="v<?php echo str_replace("/", "-", wp_parse_url(get_permalink())['path']); ?>">
    <div id="signinTab" class="login-form-full" style="display:block">
        <div class="content-inn">
            <h1 class=" center ">Anmelden</h1>
            <img class="verlauf center klein" src="<?php echo get_template_directory_uri(); ?>/images/verlauf.png">
            <br /><br /><br /><br />

            <div class="flex drei">

                <div class="register-box">
                    <div class="roundwith">
                        <?php the_field('regisiter_text', 'option') ?><br />

                        <button class="button blue full login bottomabsolut" onclick="OpenTab('signinTab','create1Tab')"><?php the_field('registrieren', 'option') ?></button>
                    </div>
                </div>

                <div class="login-box">
                    <div class="roundwith">
                        <h3 class="center big"><?php the_field('anmelden', 'option') ?></h3>
                        <br />


                        <h4 class="center"><?php the_field('sign_in_with', 'option') ?></h3><br />
                            <div id="noSocial">
                                <div class="social">

                                    <div class="tile">
                                        <button class="button-game google" onclick="SignInProvider('google')">
                                            <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/google.svg" alt="Sigin Google">
                                        </button>

                                    </div>
                                    <div class="tile">
                                        <button class="button-game facebook " onclick="SignInProvider('facebook')">
                                            <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/facebook.svg" alt="Sigin Facebook">
                                        </button>

                                    </div>
                                    <div class="tile">
                                        <button class="button-game apple " onclick="SignInProvider('apple')">
                                            <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/apple.svg" alt="Sigin Apple">
                                        </button>

                                    </div>


                                </div>
                            </div>

                            <div class="line">
                                <div class="or">or</div>
                            </div>

                            <form class="signinForm" onsubmit="return false">
                                <div class="fieldbox">
                                    <label class="inputTitle"><?php the_field('email_address', 'option') ?></label>
                                    <input class="mdl-textfield__input" autofocus autocomplete style="display:inline;width:auto;" tabindex="1" type="text" id="email" name="email" placeholder="Email" />
                                </div>
                                <br />
                                <div class="fieldbox">
                                    <label class="floatleft inputTitle"><?php the_field('password', 'option') ?></label>

                                    <input class="mdl-textfield__input pwToggle" autofocus autocomplete style="display:inline;width:auto;" tabindex="2" type="password" id="password" name="password" placeholder="Password" />
                                    <a href="<?php echo get_home_url(); ?>/login/?forgot">
                                        <div class="forgotpassword"><?php the_field('forgot_password', 'option') ?></div>
                                    </a>
                                </div>
                                <br />

                                <div class="flex doppel fieldbox" style="width:unset">
                                    <label class="containerradio"><?php the_field('show_password', 'option') ?>
                                        <input type="checkbox" onclick="TogglePW(this)">
                                        <span class="checkmark" style="cursor:pointer;"></span>
                                    </label>
                                </div>
                                <br /> <br /> <br />
                                <button class="button blue full login" autofocus type="submit" onclick="SignIn()"><?php the_field('anmelden', 'option') ?></button>
                            </form>
                    </div>
                </div>

                <div class="anonym-box">
                    <div class="roundwith">
                        <h3 class="center big">Anonym</h3>
                        <br />
                        <!-- <div>
                            <label class="inputTitle"><?php the_field('first_name', 'option') ?></label>
                            <input class="mdl-textfield__input" type="text" id="fname_anonym" onchange="CleanInput(this)" value="" />
                            <div class="inputverify"></div>
                        </div>
                        <br />
                        <div>
                            <label class="inputTitle"><?php the_field('last_name', 'option') ?></label>
                            <input class="mdl-textfield__input" type="text" id="lname_anonym" onchange="CleanInput(this)" value="" />
                            <div class="inputverify"></div>
                        </div> -->
                        <br />

                        <?php the_field('anonym_text', 'option') ?>

                        <div class="tile">
                            <button class="button grau full login bottomabsolut" onclick="SignUpAnonym()"><?php the_field('visit_anonym', 'option') ?></button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!--   .................................................................................................Forgot your password         -->


    <div id="forgotpwTab" class="login-form">
        <h2 class="titlesmal">Forgot your password</h2>
        <p>Enter your user account's verified email address and we will send you a password reset link.</p>
        <div class="line light"></div>
        <form onsubmit="return false">
            <label>Email adress</label>
            <div>
                <input class="mdl-textfield__input" style="display:inline;width:auto;" type="text" id="femail" name="Password" placeholder="Email" />
            </div>
            <br />
            <br />
            <button class="button full blue login" onclick="ForgotPW('femail', 'forgotPWFeedback')">Send recovery email</button>
        </form>
        <ul class="inputFeedback" id="forgotPWFeedback">
        </ul>

    </div>
    <div id="finishforgotpwTab" class="login-form">
        <h2 class="titlesmal">Forgot your password</h2>
        <p>Check your email for a link to reset your password. You may have to check your spam folder.</p>
        <div class="line light"></div>
        <br />

        <button class="button full blue login" onclick="OpenTab('finishforgotpwTab','signinTab')">Back to Login</button>
        <br />
    </div>

    <div id="create1Tab" class="login-form">
        <h2 class="titlesmal">Create your Account</h2>
        <p>Already have an account? <button id="signUpEmail" class="signup button transparent" onclick="OpenTab('create1Tab','signinTab')">Sign In</button></p>
        <div class="line light"></div>

        <p class="center">Sign up with</p>

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
                        <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/facebook.svg" alt="Sigin Google">
                    </button>
                    <label>Facebook</label>
                </div>
                <div class="tile">
                    <button class="button-game apple" onclick="SignInProvider('apple')">
                        <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/apple.svg" alt="Sigin Google">
                    </button>
                    <label>Apple</label>
                </div>
            </div>
        </div>

        <div class="line">
            <div class="or">OR</div>
        </div>
        <div>
            <form onsubmit="return false">
                <div>
                    <label class="inputTitle" id="semailtitle">Email address</label>
                    <input class="mdl-textfield__input" style="display:inline;width:auto;" type="text" id="semail" name="email" placeholder="Email" onchange="CheckEmail(this)" />
                </div>
                <br /><br /><br />
                <button id="signUpEmailBtn" class="button signup blue full login" onclick="CheckEmailSignup()">Continue</button>
            </form>
            <br />
            <ul class="inputFeedback" id="newEmailFeedback">
            </ul>
            <div class="line light"></div>
            <p>By continuing, you agree to VIMU’s <a href="<?php echo get_home_url(); ?>/about-us/terms-of-use/">Terms of use</a> and acknowledge that you've read our <a href="<?php echo get_home_url(); ?>/about-us/privacy-policy/">Privacy Policy</a></p>
        </div>
    </div>
    <div id="create2Tab" class="login-form">
        <h2 class="titlesmal">Choose a password</h2>
        <form onsubmit="return false">
            <div>
                <label class="inputTitle" id="spwtitle">Password</label>
                <input class="pwToggle" style="display:inline;width:auto;" type="password" id="spw" name="Password" placeholder="8 characters minimum" onchange="CheckPassword(this, 'srpw' )" />
            </div>
            <br />
            <div>
                <label class="inputTitle" id="srpwtitle">Repeat Password</label>
                <input class="pwToggle" style="display:inline;width:auto;" type="password" id="srpw" name="RepeatPassword" placeholder="Repeat Password" onchange="CheckPassword(this, 'spw')" />
            </div>
            <br /> <br />
            <div class="flex doppel" style="width:unset">
                <label class="containerradio"> Show password
                    <input type="checkbox" onclick="TogglePW(this)">
                    <span class="checkmark" style="cursor:pointer;"></span>
                </label>
            </div>
            <br /> <br /><br />
            <button id="signUpPW" class="button signup blue full login" onclick="CheckPasswordSignup()">Create Account</button>
        </form>
        <br />
        <p>
        <ul class="inputFeedback" id="newEmailFeedback">
        </ul>
        </p>
    </div>

    <div id="profileTab" class="login-form">
        <div class="edit-profile active">
            <h2 class="titlesmal">Edit your profile</h2>
            <br />
            <p>Privacy is a matter of trust and your trust is important to us. We respect your privacy. Therefore, we ensure the protection and lawful processing of your personal data.</p>
            <br />
            <div class="line"></div>
            <form onsubmit="return false">
                <div>
                    <label class="inputTitle">First name</label>
                    <input type="text" id="fname" onchange="CleanInput(this)" placeholder="First Name">
                    <div class="inputverify"></div>
                    <br />
                </div>

                <div>
                    <label class="inputTitle">Last name</label>
                    <input type="text" id="lname" onchange="CleanInput(this)" placeholder="Last Name">
                    <div class="inputverify"></div>
                    <br />
                </div>

                <div>
                    <label class="inputTitle">Nickname (visible to other visitors)</label>
                    <input type="text" id="uname" onchange="CleanInput(this)" placeholder="User Name">
                    <div class="inputverify"></div>
                    <br />
                </div>

                <div class="profilepicture-box">
                    <div class="profilepicture">
                        <img id="profilePic" src="">
                    </div>
                    <input id="profilePicUpload" class="file-upload" type="file" accept="image/*" onchange="ReadURL(this)" /><label for="profilePicUpload">Edit your profile picture</label>
                    <div class="clear"></div>
                    <br />
                </div>


                <div class="flex doppel newsletterJoiner">
                    <label class="containerradio"> Join newsletter
                        <input id="joinNewsletter" type="checkbox" onclick="ToggleKeepSignedIn()">
                        <span class="checkmark"></span>
                    </label>
                    <br /> <br />
                </div>

                <button class="button signup blue full login" id="submitProfile" onclick="UpdateProfileManual(this)">Finish Profile</button>
            </form>
            <br />
            <ul class="inputFeedback" id="newEmailFeedback">
            </ul>
        </div>
    </div>
    <div id="verifyTab" class="login-form" style="padding-top:120px">
        <h2 class="titlesmal">Verify your account</h2>
        <br />
        <p>Please check your mailbox for the verification email.
            Did not get the email? Check your spam or send again.</p>
        <br />
        <button class="button blue" onclick="SendVerification(this)">Send Again</button>
        <ul class="inputFeedback blue" id="verificationFeedback">
        </ul>
    </div>
</div>

<?php get_footer();  ?>