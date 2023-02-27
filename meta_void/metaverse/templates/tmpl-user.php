<script type="text/html" id="user_tmpl">
    <div class="user-block" id="a{{uid}}">
        <div class="userimage">
            <div id="part_profileSpeakingOutline">
                <img id="part_profil" src="{{image}}">
                <img class="blablabla" src="<?php echo get_template_directory_uri(); ?>/metaverse/images/speaking.svg">
            </div>
        </div>

        <div id="part_name">
            <div class="centercenter">
                {{uname}}
            </div>
        </div>


        <div class="button-speaker">
            <!-- Game -->
            <button id="mute" class="button grau" onclick="ToggleMuteParticipant('{{uid}}')">
                <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/icon_microphone_on.svg" alt="Toggle Voice Chat">
            </button>
        </div>

    </div>
</script>