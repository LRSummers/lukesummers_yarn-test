// @require ~/content/js/_libs/jquery.easyResponsiveTabs/jquery.easyResponsiveTabs.js";

//== horizontal tabs
$('.tabs-horizontal').easyResponsiveTabs({
	type: 'default', // Types: default, vertical, accordion           
	width: 'auto', // auto or any custom width
	fit: true, // 100% fits in a container
	closed: 'accordion' // Close the panels on start, the options 'accordion' and 'tabs' keep them closed in there respective view types
});

//== vertical tabs
$('.tabs-vertical').easyResponsiveTabs({
	type: 'vertical',
	width: 'auto',
	fit: true,
	closed: 'accordion'
});