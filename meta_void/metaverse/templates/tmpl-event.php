<script type="text/html" id="event_tmpl">
    <div id="{{uid}}" class="{{eventtype}}">
        <div class="text">
            <div class="header-details">
                <div class="{{privateClass}}">{{private}}</div>

                <div>
                    <button class="button-icon" id="detailShare" onclick="OpenDetailPage('{{uid}}')"><img src="<?php echo get_template_directory_uri(); ?>/metaverse/images/share.svg"></button>
                    <button class="button-icon" id="detailClose" style="display:none;" onclick="CloseDetailPage()"><img src="<?php echo get_template_directory_uri(); ?>/metaverse/images/close.svg"></button>
                </div>

            </div>


            <div class="titel-details">
                <div class="date">

                    <div class="date-month"> {{month}} </div>
                    <div class="date-day"> {{day}} </div>

                </div>
                <div class="title-box-meta">
                    <div id="event_title"> {{title}}</div>

                    <div id="event_timing"> {{time}} </div>
                </div>
            </div>

            <div class="eventsDetail-content" style="height: 293px">


                <div id="event_description"> {{description}} </div>
                <br />
                <div id="event_participants" style="    width: 100%;">
                    <div>
                        <p class="kleingrau">Attendees</p>
                        <div class="participantsDetails" id="detailMembers"></div>
                        <div class="participantsDetails" id="emptyMembers">
                            <div class="user_mini"></div>
                            <div class="user_mini"></div>
                            <div class="user_mini"></div>
                            <div class="user_mini"></div>
                            <div class="user_mini"></div>
                            <div class="user_mini"></div>
                            <div class="user_mini"></div>
                            <div class="user_mini"></div>
                            <div class="user_mini"></div>
                        </div>
                        <div class="userCount"><span id="userCountCurrent">{{userCount}}</span>/14</div>
                        <div class="clear"></div>
                    </div>
                    <br />
                    <p class="kleingrau">Hosted by</p>
                    <div class="hosted">
                        <div class="quadrat">
                            <img id="host_img" src="{{image}}">
                        </div>
                        <div id="event_owner"> {{user}} </div>
                    </div>
                    <br /><br />
                </div>
            </div>
        </div>
        <button class="button blau {{isFullClass}}" id="meetEventButton" data-uid="{{uid}}" onclick="MeetEvent(this)">{{enterText}}</button>
    </div>
</script>