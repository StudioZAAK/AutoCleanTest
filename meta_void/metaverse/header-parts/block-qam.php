<div class="qam" id="debugger">
    <div class="close">
        <?php echo file_get_contents(get_template_directory_uri() . "/metaverse/svg/close.svg"); ?>
    </div>

    <h3 class="din">Quick Access Menu</h3>
    <hr />

    <div class="tool margin">
        <!-- Toggle Voice Chat  -->
        <div class="tile">
            <button class="toggle-game" id="voiceToggle" onclick="ToggleVoice()">
                <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/voiceChat.svg" alt="Toggle Voice Chat">
            </button>
            <label>Voice Chat</label>
        </div>

        <!-- Toggle Microphone  -->
        <div class="tile disabled">
            <button class="toggle-game" id="voiceMicrophone" onclick="ToggleMuteSelf()">
                <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/voiceMicrophoneOn.svg" alt="Toggle Mute Self">
            </button>
            <label>Microphone</label>
        </div>

        <!-- Open Participants  -->
        <div class="tile">
            <button class="button-game" id="toggleParticipants" onclick="ToggleMuteSelf()">
                <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/participants.svg" alt="Open Participants">
            </button>
            <label>Participants</label>
        </div>

        <!-- Toggle Quick Tips -->
        <div class="tile">
            <button class="toggle-game" id="quickTipsToggle" onclick="ToggleTips()">
                <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/quickTips.svg" alt="Toggle Quick Tips">
            </button>
            <label>Quick Tips</label>
        </div>

        <!-- Toggle Day/Night -->
        <div class="tile">
            <button class="toggle-game" id="environmentToggle" onclick="ToggleEnvironment()">
                <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/nightMode.svg" alt="Toggle Quick Tips">
            </button>
            <label>Night Mode</label>
        </div>

        <!-- Toggle FullScreen  -->
        <div class="tile">
            <button class="toggle-game" id="unity-fullscreen-button" onclick="ToggleFullscreen()">
                <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/fullscreen.svg" alt="Toggle Quick Tips">
            </button>
            <label>Fullscreen</label>
        </div>

        <div class="selectiontile" id="movementMode">
            <div class="tile" style="padding-right: 2px;">
                <input type="radio" name="move" id="clickmove" value="0">

                <button class="radio-game" onclick="SetMovementMode(0)">
                    <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/tool-movement.svg" alt="Toggle Quick Tips">

                </button>
                <label>Click To Move</label>

            </div>
            <div class="tile" style="margin-left: -2px;    padding-right: 5px;">
                <input type="radio" name="move" id="freemove" value="1" >

                <button class="radio-game" onclick="SetMovementMode(1)">
                    <img src="<?php echo get_template_directory_uri(); ?>/metaverse/svg/tool-freemovement.svg" alt="Toggle Quick Tips">
                </button>
                <label>Free Movement</label>

            </div>
        </div>

    </div> <!-- .tool  -->
    <div class="toggle-game audio" id="volume">
        <div class="button-audio">
            <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 29 26" style="enable-background:new 0 0 29 26;" xml:space="preserve">
                <style type="text/css">
                    .st0777 {
                        fill: #ffffff;
                    }
                </style>
                <path class="st0777" d="M0.605,8.642v8.155c0,0.954,0.772,1.729,1.725,1.729c0,0,0.002,0,0.004,0H6.01l7.537,5.777
			c0.865,0.676,2.115,0.522,2.791-0.344c0.28-0.36,0.429-0.806,0.422-1.263V2.713c-0.013-1.114-0.928-2.005-2.043-1.99
			c-0.434,0.006-0.856,0.152-1.201,0.416L6.01,6.913H2.333C1.379,6.911,0.605,7.684,0.605,8.638C0.605,8.64,0.605,8.64,0.605,8.642z" />
                <path class="st0777" d="M28.395,12.688c0-4.477-2.642-8.476-6.146-9.303c-0.499-0.113-0.999,0.191-1.116,0.691s0.191,0.999,0.691,1.118
			c2.644,0.624,4.716,3.916,4.716,7.496c0,3.619-2.072,6.943-4.716,7.567c-0.499,0.117-0.808,0.618-0.691,1.118
			c0.1,0.427,0.481,0.715,0.902,0.715c0.071,0,0.143-0.007,0.214-0.024C25.755,21.235,28.395,17.203,28.395,12.688z" />
                <path class="st0777" d="M20.053,16.336c-0.442,0.26-0.59,0.828-0.332,1.27c0.173,0.295,0.483,0.459,0.802,0.459
			c0.16,0,0.321-0.041,0.47-0.128c1.714-1.005,2.78-3.002,2.78-5.214c0-2.21-1.066-4.208-2.78-5.214
			C20.55,7.249,19.98,7.398,19.72,7.84s-0.111,1.01,0.33,1.27c1.131,0.665,1.862,2.083,1.862,3.613
			C21.915,14.253,21.184,15.672,20.053,16.336z" />
            </svg>



            <form class="range audioslider">
                <div class="form-group range__slider">
                    <input type="range" min="0" max="100" value="50" class="slider" id="gameAudioSlider" oninput="SetGameVolume(this)">
                </div>
                <div class="form-group range__value">
                    <span></span>
                </div>
            </form>

        </div>
        <label class="label-audioslider">Volume Museum</label>
    </div>
    <!-- 
    <div class="tool zusammen radiobut" id="movementMode">
        <div class="toggle-game">
            <input type="radio" id="clickmove" name="move" value="0" onclick="SetMovementMode(0)">
            <label class="label-clickmove" for="clickmove">
                <div class="svg-box"></div>
                Click To Move
            </label>
        </div>


        <div class="toggle-game">
            <input type="radio" id="freemove" name="move" value="1" onclick="SetMovementMode(1)">
            <label class="label-freemove" for="freemove">
                <div class="svg-box"></div>
                Free Movement
            </label>
        </div>

    </div> -->
</div>