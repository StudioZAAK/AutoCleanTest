<?php
define('ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true);
// removing code from header
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'index_rel_link');
remove_action('wp_head', 'parent_post_rel_link', 10, 0);
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_styles', 'print_emoji_styles');

// Register Menus for Wordpress use
register_nav_menus(
    array(

        'primary'   =>   __('Primary Menu', 'naked'),
        'about'   =>   __('about', 'naked'),
        'tutorial'   =>   __('tutorial', 'naked'),
        'faq'   =>   __('faq', 'naked'),
        'profile'   =>   __('profile', 'naked'),

    )
);

function kb_svg($svg_mime)
{
    $svg_mime['svg'] = 'image/svg+xml';
    return $svg_mime;
}
add_filter('upload_mimes', 'kb_svg');

function use_gd_editor($array)
{
    return array('WP_Image_Editor_GD',);
}
add_filter('wp_image_editors', 'use_gd_editor');
add_filter('big_image_size_threshold', '__return_false');


// Enqueue Styles and Scripts
function wumm_scripts()
{
    wp_enqueue_style('regional-style', get_template_directory_uri() . '/style.css', '10000', '4.93');
}
add_action('wp_enqueue_scripts', 'wumm_scripts');


function codex_custom_init()
{



    register_post_type('tutorial_pages', array(
        'public' => true,
        'menu_position' => 5,
        'label'  => 'Tutorial',
        'rewrite' => array('slug' => 'tutorial'),

    ));

    register_post_type('aboutus_pages', array(
        'public' => true,
        'menu_position' => 5,
        'label'  => 'About Us',
        'rewrite' => array('slug' => 'about-us'),


    ));

    register_post_type('faq_pages', array(
        'public' => true,
        'menu_position' => 5,
        'label'  => 'FAQ',
        'rewrite' => array('slug' => 'faq'),

    ));

    register_post_type('profil', array(
        'public' => true,
        'menu_position' => 5,
        'label'  => 'Profil'

    ));


}
add_action('init', 'codex_custom_init');



function kb_admin_style()
{
    wp_enqueue_style('admin-styles', get_template_directory_uri() . '/style-admin.css');
}
add_action('admin_enqueue_scripts', 'kb_admin_style');
add_filter('gform_confirmation_anchor', 'your_function_name');

function remove_admin_menus()
{
    remove_menu_page('edit.php'); // Posts 
    remove_menu_page('edit-comments.php'); // Comments
}
add_action('admin_menu', 'remove_admin_menus');

if (function_exists('add_image_size')) {

    add_image_size('hoch-b', 390, 520, true); // sliderbild Parallax to top		
    add_image_size('hoch-m', 390, 520, true); // sliderbild Parallax to top
	add_image_size('hoch-m', 390, 520, true); // sliderbild Parallax to top

	add_image_size('quer-b', 558, 476, true); // sliderbild Parallax to top
	add_image_size('quer-m', 558, 476, true); // sliderbild Parallax to top
	add_image_size('quer-s', 558, 476, true); // sliderbild Parallax to top
	
		add_image_size('quad-b', 558, 558, true); // sliderbild Parallax to top
	add_image_size('quad-m', 558, 558, true); // sliderbild Parallax to top
	add_image_size('quad-s', 558, 558, true); // sliderbild Parallax to top
	
	

    add_image_size('bg-s', 800); // sliderbild Parallax to top		
    add_image_size('bg-m', 1200); // sliderbild Parallax to top			
    add_image_size('bg-b', 1920 ); // sliderbild Parallax to top	

   



};

add_filter('show_admin_bar', '__return_false');

if (function_exists('acf_add_options_page')) {

    acf_add_options_page();
}

// custom admin logo
function login_logo()
{ ?>
    <style type="text/css">
        .login h1 a {
            background-image: url("<?php the_field('pw_logo', 'options'); ?>");
            -webkit-background-size: auto 128px;
            background-size: auto 128px;
            width: auto;
            height: 128px;
        }
    </style>
<?php }
add_action('login_head', 'login_logo', 100);
add_action('login_enqueue_scripts', 'login_logo');
