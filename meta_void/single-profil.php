<?php get_header(''); ?>

<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>

        <!--  _____________________________________________________header-->



        <!--  _____________________________________________________ content-->

        <div class="page" data-title="Account" id="profile-page">

            <div class="header-profile">

                <div class="contentbox about">

                    <div class=" flex">
                        <div class="left w30">
                            <!-- <div class="back">
                                <button class="grau" onclick="history.back()">Back</button>
                            </div> -->

                            <div class="menu">
								           <button class="backipso" onclick="history.back()">Back</button>

                                <?php wp_nav_menu(array('theme_location' => 'profile'));  ?>
                                <button id="logout" onclick="LogOut()">Log Out</button>

                                <br /><br />
                            </div>
                        </div>

                        <div class="right w70">
                            <div class="content-inside">
                            <div id="anonymousProfile">
                                    <h2 class="din">To get the full experience out of the IPSOverse create an Account</h2>
                                    <a href="<?php echo get_home_url(); ?>/login/">
                                            <button id="enterMuseumButton">Create an account</button>
                                        </a>
                                    <br />
                                </div>
                                <?php
                                $type = get_field('subpage');
                                switch ($type):
                                    case "email": ?>
                                        <div class="edit-email">
                                            <h2 class="din">Edit your Email</h2>
                                            <br />
                                            <form onsubmit="return false">
                                                <div>
                                                    <label>Current email address</label>
                                                    <input type="text" id="cemail" value="" readonly>
                                                </div>
                                                <br />
                                                <div>
                                                    <label class="inputTitle">Retype Password for verification</label>
                                                    <input class="pwToggle" type="password" id="cepw" value="">
                                                </div>
                                                <br />
                                                <div>
                                                    <label class="inputTitle">New email address</label>
                                                    <input type="text" id="nemail" value="" onchange="CheckEmail(this, 'rnemail')">
                                                </div>
                                                <br />
                                                <div>
                                                    <label class="inputTitle">Repeat new email address</label>
                                                    <input type="text" id="rnemail" value="" onchange="CheckEmail(this, 'nemail')">
                                                </div>
                                                <br />
                                                <div class="flex doppel" style="width:unset; min-height:unset;">
                                                    <label class="containerradio"> Show password
                                                        <input type="checkbox" onclick="ToggleShowPW2(this)">
                                                        <span class="checkmark" style="cursor:pointer;"></span>
                                                    </label>
                                                </div><br /><br />
                                                <button class="button blue inputbutton" id="submitNewEmail" onclick="CheckUpdateEmail()">Verify new email address</button>
                                            </form>

                                            <ul class="inputFeedback" id="updateEmailFeedback">
                                            </ul>
                                        </div>
                                    <?php break;
                                    case "profile": ?>
                                        <div class="edit-profile active" id="profileProper">
                                            <form onsubmit="return false">
                                                <h2 class="din">Edit your profile</h2>
                                                <br />
                                                <div>
                                                    <label class="inputTitle">First name</label>
                                                    <input type="text" id="fname" onchange="CleanInput(this)" value="">
                                                    <div class="inputverify"></div>
                                                    <br />
                                                </div>

                                                <div>
                                                    <label class="inputTitle">Last name</label>
                                                    <input type="text" id="lname" onchange="CleanInput(this)" value="">
                                                    <div class="inputverify"></div>
                                                    <br />
                                                </div>

                                                <div>
                                                    <label class="inputTitle">Nickname (visible to other visitors)</label>
                                                    <input type="text" id="uname" onchange="CleanInput(this)" value="">
                                                    <div class="inputverify"></div>
                                                    <br />
                                                </div>

                                                <div class="profilepicture-box">
                                                    <div class="profilepicture">
                                                        <div id="profilePicHover" class="disabled" onclick="DeleteProfilePicture()">
                                                            <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/delete.svg" alt="close">
                                                        </div>
                                                        <img id="profilePic" src="">
                                                    </div>
                                                    <input id="profilePicUpload2" class="file-upload" type="file" accept="image/*" onchange="ReadURL(this)" /><label for="profilePicUpload2">Edit your profile picture</label>
                                                    <div class="clear"></div>
                                                    <br />
                                                </div>
                                                <div class="flex doppel newsletterJoiner" style="width:unset; min-height:unset;">
                                                    <label class="containerradio"> Join newsletter
                                                        <input id="joinNewsletter" type="checkbox" onclick="ToggleKeepSignedIn()">
                                                        <span class="checkmark"></span>
                                                    </label>
                                                    <br /><br />
                                                </div>
                                                <button class="button blue" id="saveButtonProfile" onclick="UpdateProfileManual(this)">Save</button>
                                            </form>
                                            <ul class="inputFeedback">
                                            </ul>
                                        </div>
                                        <?php break; ?>
                                    <?php
                                    case "delete": ?>
                                        <div class="edit-delete">
                                            <div id="deleteEmailCheck" value="" style="display:none;"></div>
                                            <h2 class="din">Delete your account</h2>
                                            <br />
                                            <p>You’ll lose all the data and content in your account. Please enter your email to proceed.</p>
                                            <br />
                                            <br />
                                            <form onsubmit="return false">
                                                <div>
                                                    <label class="inputTitle">To confirm, enter your nickname</label>
                                                    <input type="text" id="delete_mail" name="delete_mail" onchange="CheckDelete(this, 'deleteEmailCheck')" value="">
                                                </div>
                                                <br />
                                                <span id="deletePWParent" style="display:none;">
                                                    <div>
                                                        <label class="inputTitle">To confirm, also add your password</label>
                                                        <input class="pwToggle" id="deletePW" type="password" value="">
                                                    </div>
                                                    <br />
                                                    <div class="flex doppel" style="width:unset; min-height:unset;">
                                                        <label class="containerradio"> Show password
                                                            <input type="checkbox" onclick="ToggleShowPW2(this)">
                                                            <span class="checkmark" style="cursor:pointer;"></span>
                                                        </label>
                                                    </div>
                                                    <br />
                                                    <br />
                                                </span>

                                                <button class="button blue inputbutton" id="delete_account" onclick="CheckDeleteAccount()">Permanently delete my account</button>
                                            </form>

                                            <ul class="inputFeedback">
                                            </ul>
                                        </div>
                                        <?php break; ?>
                                    <?php
                                    case "password": ?>
                                        <div class="edit-password">
                                            <h2 class="din">Edit your password</h2>
                                            <br />
                                            <form onsubmit="return false">
                                                <div>
                                                    <label>Current password</label>
                                                    <input class="pwToggle" type="password" id="cpw" name="fname" value="">
                                                </div>
                                                <br />
                                                <div>
                                                    <label class="inputTitle">New password</label>
                                                    <input class="pwToggle" type="password" id="npw" name="fname" value="" onchange="CheckPassword(this, 'rnpw')">
                                                </div>
                                                <br />
                                                <div>
                                                    <label class="inputTitle">Repeat new password</label>
                                                    <input class="pwToggle" type="password" id="rnpw" name="fname" value="" onchange="CheckPassword(this, 'npw')">
                                                </div>
                                                <br />
                                                <div class="flex doppel" style="width:unset; min-height:unset;">
                                                    <label class="containerradio"> Show password
                                                        <input type="checkbox" onclick="ToggleShowPW2(this)">
                                                        <span class="checkmark" style="cursor:pointer;"></span>
                                                    </label>
                                                </div><br /><br />
                                                <button class="button blue inputButton" id="submitPassword" onclick="UpdatePWFirebase()">Save new password</button>
                                            </form>

                                            <ul class="inputFeedback">
                                            </ul>
                                        </div>
                                        <?php break; ?>
                                    <?php
                                    case "create": ?>
                                        <?php break; ?>
                                <?php endswitch; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
    <?php endwhile; // query_post 
    ?>

<?php endif; // post 
?>


<?php get_footer('');  ?>