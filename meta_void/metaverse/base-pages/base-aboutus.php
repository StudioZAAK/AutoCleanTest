<?php get_header(''); ?>
<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>

        <!--  _____________________________________________________header-->



        <!--  _____________________________________________________ content-->

        <div class="page" data-title="Imprint" id="v<?php echo str_replace("/", "-", wp_parse_url(get_permalink())['path']); ?>">
            <div class="header-about">
                <div class="contentbox about">
                    <div class=" flex">
                        <div class="left w30">
                            <!-- <div class="back">
                                <button class="grau" onclick="history.back()">Close</button>
                            </div> -->

                            <div class="menu">
                                <?php wp_nav_menu(array('theme_location' => 'about'));  ?>
                            </div>
                        </div>

                        <div class="right w70">
                            <?php if (have_rows('tutorial')) : ?>
                                <?php $count = 1;
                                while (have_rows('tutorial')) : the_row(); ?>


                                    <div class="content-tutorial id-<?php echo $count; ?>">

                                        <div class="<?php if (get_sub_field('layout_small')) : ?>small<?php endif;  ?>">
                                            <h1 class="din"><?php the_sub_field('titel'); ?></h1>
                                            <p><?php the_sub_field('content'); ?> </p>

                                            <?php if (have_rows('block')) : ?>
                                                <?php while (have_rows('block')) : the_row(); ?>
                                                    <?php if (get_row_layout() == 'video') :   ?>

                                                        <br />
                                                        <hr>
                                                        <br /><br />
                                                        <div class="videoWrapper">
                                                            <?php the_sub_field('video'); ?>
                                                        </div>

                                                    <?php elseif (get_row_layout() == 'accordion') :   ?>
                                                        <br /><br />
                                                        <div class="accordion-container">
                                                            <?php
                                                            while (have_rows('accordion')) : the_row(); ?>

                                                                <div class="accordion-title js-accordion-title">
                                                                    <h4 class="din"><?php the_sub_field('titel'); ?></h4>
                                                                    <img class="pfeil" src="<?php echo get_template_directory_uri(); ?>/images/pfeil-front.svg" alt="accordion">
                                                                </div>
                                                                <div id="acc-id1" class="accordion-content">
                                                                    <?php the_sub_field('content'); ?>
                                                                </div>
                                                            <?php endwhile;  ?>
                                                        </div>

                                                    <?php elseif (get_row_layout() == 'downloads') :   ?>

                                                        <br /><br />
                                                        <div class="downloads">
                                                            <label>Downloads</label><br />
                                                            <?php
                                                            while (have_rows('download')) : the_row(); ?>

                                                                <div class="download-button">
                                                                    <a download href="<?php the_sub_field('datei'); ?>">
                                                                        <img class="download-icon" src="<?php echo get_template_directory_uri(); ?>/images/download.svg" alt="accordion">
                                                                        <?php the_sub_field('linktext'); ?>

                                                                    </a>
                                                                </div>
                                                            <?php endwhile;  ?>
                                                        </div>

                                                    <?php endif; ?>
                                                <?php endwhile; ?>
                                            <?php endif; ?>
                                        </div>
                                    </div>

                                <?php $count++;
                                endwhile; ?>
                            <?php endif;  ?>
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