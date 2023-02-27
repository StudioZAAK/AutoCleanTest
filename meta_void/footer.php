

</div> <!--  ajaxmain-->
</div> <!--  container-->





</div> <!--  container-->



<!-- 
	<div class="close-back">
					<a class="grau" href="<?php echo get_home_url(); ?>/<?php   the_field('hub_url', 'options'); ?>/"><img class="" src="<?php echo get_template_directory_uri(); ?>/metaverse/images/close-icon.svg" alt="close"></a> 
				</div>
-->



<?php wp_footer(); ?>
 
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js'></script>

<script src="<?php echo get_template_directory_uri(); ?>/js/custom_themes.js"></script>




<script type="text/javascript">
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
	

</script>





</body>

</html>