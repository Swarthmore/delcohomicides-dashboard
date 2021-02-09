<?php
/**
 * Plugin.
 *
 * @package dgv-dash
 * 
 * @wordpress-plugin
 *
 * Plugin Name:     DGV Dash
 * Description:     A react app for the delco gun violence dashboard
 * Author:          Tony <aweed1@swarthmore.edu>
 * Version:         0.1
 * Domain Path:     /languages
 */

/**
 * Shortcode which renders Root element for your React App.
 *
 * @return string
 */
function dgv_dash_shortcode() {

	/**
	 * You can pass in here some data which if you need to have some settings\localization etc for your App,
	 * so you'll be able for example generate initial state of your app for Redux, based on some settings provided by WordPress.
	 */
	$settings = array(
		'l18n'       => array(
			'main_title' => 'Hi this is your React app running in WordPress',
		),
		'some_items' => array( 'lorem ipsum', 'dolor sit amet' ),
	);

	return '<div id="dgv-dash-app" data-default-settings="' . esc_attr( wp_json_encode( $settings ) ) . '"></div>';
}

add_shortcode(
	'dgv-dash',
	'dgv_dash_shortcode'
);

/**
 * Enqueues styles and js compiled for plugin.
 */
function md_react_app_enqueue_assets() {

	$ver         = ( get_plugin_data( __FILE__ ) )['Version'];
	$js_to_load  = plugin_dir_url( __FILE__ ) . 'dist/bundle.js';

	if ( defined( 'ENV_DEV' ) && ENV_DEV ) {
		// DEV React dynamic loading.
		$ver         = gmdate( 'Y-m-d-h-i-s' );
		$js_to_load  = 'http://localhost:8000/dist/bundle.js';
	}

	/* `wp-element` as dependency will load React and ReactDom for our app from `wp-includes` */
	wp_enqueue_script( 'dgv-dash', $js_to_load, array( 'wp-element' ), $ver, true );

}

add_action( 'wp_enqueue_scripts', 'md_react_app_enqueue_assets' );
