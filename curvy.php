<?php
/**
 * Plugin Name:       Curvy
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       curvy
 *
 * @package CreateBlock
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

 namespace WebDevEducation;

 if (!defined('ABSPATH')) {
	die('Silence is golden.');
}

final class curvy
{
	static function init()
	{
		add_action('enqueue_block_assets', function () {
			wp_enqueue_style("dashicons");
			$style_url = plugins_url("build/style-index.css", __FILE__);
			wp_enqueue_style('curvy-style', $style_url, array());
		});
		add_action('init', function () {
			add_filter('block_categories_all', function ($categories) {
				array_unshift($categories, [
					'slug' => 'curvy',
					'title' => 'curvy'
				]);
				return $categories;
			});
			register_block_type(__DIR__ . '/build/blocks/curvy');
			register_block_type(__DIR__ . '/build/blocks/clickyGroup');
			register_block_type(__DIR__ . '/build/blocks/clickyButton');
			register_block_type(__DIR__ . '/build/blocks/piccyGallery');
			register_block_type(__DIR__ . '/build/blocks/piccyImage');
		});
	}
}

curvy::init();
