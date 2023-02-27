<div class="qam" id="Participants">
    <div class="back">
        <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
			<style>.st0789 {
    fill: #000;
}</style>

            <path class="st0789" d="M2.783,8.206C2.83,8.488,2.972,8.741,3.178,8.926l6.711,6.711C10.131,15.879,10.449,16,10.767,16
					s0.636-0.121,0.878-0.364c0.485-0.485,0.485-1.271,0-1.757L5.766,8.001l5.879-5.88c0.485-0.485,0.485-1.271,0-1.757
					c-0.485-0.485-1.272-0.485-1.757,0L3.168,7.084C2.865,7.365,2.713,7.785,2.783,8.206z" />
        </svg>

    </div>
   <div class="close">
        <?php echo file_get_contents(get_template_directory_uri() . "/metaverse/svg/close.svg"); ?>
    </div>

    <h3 class="din">
        <div class="" id="participantsNr"></div><span id="participantsTitle">Participants</span>
    </h3>

    <hr>
    <div class="participants-group">
        <div id="part_users">
            <div class="userheader">
            </div>
        </div>
        <div class="tool zwei margin" id="modToolsParticipants" style="display:none">
            <div class="button-game">
                <button class="button grau" onclick="GatherGroup()">Gather Group</button>
            </div>
            <div class="button-game">
                <button class="button grau" onclick="MuteAll(this)">Mute All</button>
            </div>
        </div>
    </div>
</div>