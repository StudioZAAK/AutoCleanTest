jQuery(document).ready(function($) {

	
	
	jQuery('.toggle-ham').click(function(){
		jQuery(this).toggleClass('open');
	});
	
	
	
	jQuery('.menu a').click(function(){
		jQuery('.toggle-ham').removeClass('open');
	});
	
	jQuery(' #logobox a').click(function(){
		jQuery('.toggle-ham').removeClass('open');
	});
	
	jQuery(' .right a').click(function(){
		jQuery('.toggle-ham').removeClass('open');
	});
	
	
    jQuery(window).scroll(function() {
        var scroll = $(window).scrollTop();


		
		   if (scroll >= 56) {
            jQuery("body").addClass("nav-top");
        } else {
            jQuery("body").removeClass("nav-top");
        }
		
		   if (scroll >= 56) {
            jQuery("body").addClass("nav-top-ani");
				jQuery("body").removeClass("nav-top-anizur");   
        } else {
         
        }
		
		
		   if (scroll >= 56) {
            
        } else {
			jQuery("body").addClass("nav-top-anizur");
            jQuery("body").removeClass("nav-top-ani");
        }
		
		
		
		
    });
	
	
	
});