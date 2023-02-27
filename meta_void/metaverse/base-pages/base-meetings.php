<div class="page content home" id="meeting-page" style="background-color: unset;">
    <div class="meeting">
        <h1 class="center"><?php echo get_the_title(); ?></h1>
        <img class="verlauf center klein" src="<?php echo get_template_directory_uri(); ?>/images/verlauf.png">
        <br /><br /><br />
        <div class="einleitung-meta center" id="metaExplanation">
            <?php the_content(); ?>
            <br /><br />
            <!-- <img class="verlauf center klein" src="<?php echo get_template_directory_uri(); ?>/metaverse/images/verlauf.png"> -->
            <!-- <br /><br /><br /> -->
        </div>


        <div class="contentflex">
            <div id="eventsDetail" style="display:none;">
                <div class="eventsDetail-box" style="background-color:unset">
                    <h2>Invitation</h2>
                    <p><span id="detailHostName"></span> has invited you to the event "<span id="detailEventName"></span>" in the <?php the_field('hub_title_long_form', 'options'); ?>. If you would like to join, click the button below.</p>
                    <br />
                    <br />
                    <button id="CopyShareLink" class="button grau" onclick="CopyShareLink()">Copy Share Link</button>
                </div>
                <div class="eventsDetail-box" id="detailEventParent">
                </div>
            </div>
        </div>

        <div id="createEvent" style="display:none;">
            <div class="flex">
                <div class="eventsDetail-box" style="background-color:unset">
                    <h2>Create an Event</h2>
                    <p>Create your own event at the <?php the_field('hub_title_long_form', 'options'); ?>. You can keep it private and invite your guests with the share link (visible after creating an event). Or you can set it to pubic to open it up for everybody. An event is limited to 16 visitors, including yourself.</p>
                </div>
                <div class="createEvent-box">
                    <div class="header-details">
                        <div></div>
                        <button class="button-icon" onclick="ToggleCreateEvent('edit')"><img src="<?php echo get_template_directory_uri(); ?>/metaverse/images/close.svg"></button>
                    </div>
                    <div class="eventsDetail-content">

                        <div id="createEventUID"></div>
                        <div>
                            <div>
                                <label>Title</label>
                                <div>
                                    <input type="text" id="eventtitle" placeholder="My Meeting" oninput="CreateEventValidation(this, 32)" required>
                                    <div class="inputverify">0/32</div>
                                </div>


                                <div class="flex50">

                                    <div>
                                        <label>Start Time</label>
                                        <input type="datetime-local" step="5" id="eventStartDateTime" onblur="SetStartDate(this)">
                                        <div class="inputverify"></div>
                                    </div>


                                    <div>
                                        <label>End Time</label>
                                        <input type="datetime-local" step="5" id="eventEndDateTime" oninput="CreateEventValidation()">
                                        <div class="inputverify"></div>
                                    </div>
                                </div>
                                <br />
                                <label>Description</label>
                                <div>
                                    <textarea type="textarea" placeholder="Describe your event" style="resize: none;" id="eventdescription" oninput="CreateEventValidation(this, 185)" required></textarea>
                                    <div class="inputverify">0/185</div>
                                </div>

                                <label class="marginbottom10">Visibility</label>
                                <label class="switch doppelbutton">
                                    <div class="button"><input id="eventprivate" type="checkbox">
                                        <span id="togglePublic" class="active">Public</span>
                                        <span id="togglePrivate" class="">Private</span>
                                    </div>
                                </label>

                                <br />

                                <button id="createeventsubmit" class="button blue" onclick="CreateEvent()" disabled>Submit Event</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div id="allEventCategories">

            <div class="openEvents" id="joinedEvents">
                <img class="verlauf center klein" src="<?php echo get_template_directory_uri(); ?>/images/verlauf.png">
                <br /><br /><br />
                <h2 class="center">Joined Events</h2>
                <div id="favoritedEventsParent" class="flexevents"></div>
                <br /><br />
            </div>

            <div class="openEvents" id="myEventsblock">

                <img class="verlauf center klein" src="<?php echo get_template_directory_uri(); ?>/images/verlauf.png">
                <br /><br /><br />

                <h2 class="center">Events hosted by me</h2>
                <div id="myEventsParent" class="flexevents">
                    <div class="order3">
                        <div>
                            <button class="button blue full" style="    bottom: calc(50% - 28px);" onclick="ToggleCreateEvent('create')">Create Event</button>
                        </div>
                    </div>
                </div>
                <br /><br />

            </div>
            <div class="openEvents" id="otherEvents">
                <img class="verlauf center klein" src="<?php echo get_template_directory_uri(); ?>/images/verlauf.png">
                <br /><br /><br />
                <h2 class="center">Upcoming Events</h2>
                <div id="otherEventsParent" class="flexevents"></div>
                <br /><br />
            </div>
        </div>
    </div>

    <div class="contentstars">
        <div class="stars"></div>
        <div class="twinkling"></div>
        <div class="sterne-blau"></div>
    </div>
</div>
</div>

<?php get_footer();  ?>