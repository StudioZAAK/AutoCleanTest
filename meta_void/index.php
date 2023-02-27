<?php
/**
 * Default template
 * This template will also be called in any case where the Wordpress engine 
 * doesn't know which template to use (e.g. 404 error)
 */
get_header(); ?>

<?php if ( have_posts() ) : ?>
<?php while ( have_posts() ) : the_post(); ?>

<div class="section group">
    <div class="col span_12_of_12">
            <?php the_title( '<h1>', '</h1>' ); ?>
			<?php the_content(); ?>
    </div>
</div>

<?php endwhile; ?>
<?php else : ?>

<?php get_template_part( 'template-parts/content', 'error' ); ?>

<?php endif; ?>
<?php get_footer(); ?>