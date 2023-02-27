<!DOCTYPE html>
<html lang="de-DE">
<head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>
        <?php bloginfo('name'); // show the blog name, from settings 
        ?> |
        <?php is_front_page() ? bloginfo('description') : wp_title(''); // if we're on the home page, show the description, from the site's settings - otherwise, show the title of the post or page 
        ?>
    </title>

    <?php wp_head(); ?>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <link rel="shortcut icon" type="image/png" href="<?php echo get_stylesheet_directory_uri(); ?>/images/favicon.ico" />

    <?php echo get_template_part('metaverse/templates/tmpl', 'styles'); ?>

    <?php echo get_template_part('metaverse/templates/tmpl', 'scripts'); ?>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@200;400;500;600;700;800;900&display=swap" rel="stylesheet">

</head>

<!-- Favorits -->
<?php echo get_template_part('metaverse/templates/tmpl', 'favorits'); ?>

<!-- Ingame User List -->
<?php echo get_template_part('metaverse/templates/tmpl', 'self'); ?>
<?php echo get_template_part('metaverse/templates/tmpl', 'user'); ?>
<?php echo get_template_part('metaverse/templates/tmpl', 'moderator'); ?>

<!-- Events -->
<?php echo get_template_part('metaverse/templates/tmpl', 'event'); ?>
<?php echo get_template_part('metaverse/templates/tmpl', 'event_owned'); ?>

<?php echo get_template_part('metaverse/templates/tmpl', 'participant'); ?>
<?php echo get_template_part('metaverse/templates/tmpl', 'participant_empty'); ?>

<body <?php body_class(); ?>>

    <div class="container-all">

        <div id="fakeajaxcalls"></div>

        <!-- Create a navigation with-->
        <nav class="navi-mob">
            <ul>
                <?php if (have_rows('menu')) : ?>
                    <?php while (have_rows('menu')) : the_row(); ?>
                        <li><a href="#<?php the_sub_field('anchor') ?>"><?php the_sub_field('title') ?></a></li>
                    <?php endwhile;  ?>
                <?php endif; ?>
            </ul>
        </nav>

        <nav class="navi" id="menu">
            <ul>
                <?php if (have_rows('menu')) : ?>
                    <?php while (have_rows('menu')) : the_row(); ?>
                        <li><a href="#<?php the_sub_field('anchor') ?>"><?php the_sub_field('title') ?><img src="<?php the_field('menu_arrow', 'options'); ?>" style="fill:<?php the_field('detail_color', 'options'); ?>"></a></li>
                    <?php endwhile;  ?>
                <?php endif; ?>
            </ul>
        </nav>


        <input id="unityKeyboard" contentEditable="true">

        <?php echo get_template_part('metaverse/header-parts/block', 'headertop'); ?>
        <?php echo get_template_part('metaverse/header-parts/block', 'headermenu'); ?>
        <?php echo get_template_part('metaverse/header-parts/block', 'qam'); ?>
        <?php echo get_template_part('metaverse/header-parts/block', 'favorits'); ?>
        <?php echo get_template_part('metaverse/header-parts/block', 'participants'); ?>


        <div id="ajaxmain">