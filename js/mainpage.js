/**********************/
/* created by Fujunku Chen ***/
/****** 12-06-2017   *******/
/***********************/

$(document).ready(function(){
	/* datepicker */
	console.log("ready!");
    $('#datepicker').datepicker({
            uiLibrary: 'bootstrap4',
            iconsLibrary: 'fontawesome'
    });		
	$('#datepicker2').datepicker({
            uiLibrary: 'bootstrap4',
            iconsLibrary: 'fontawesome'
    });	
	
	
});


 $(document).ready(function () {
     /*          
	 $('#sidebarCollapse').on('click', function () {
					 
                     $('#sidebar').toggleClass('active');
					 
                 });
	 			
	*/
	 
	 $('#filter_twitter .btn_filter').on('click',function() {
		  	$('#filter_twitter .btn_filter').toggleClass('btn_active');
		  	loading_search();
			filteredSearch();
	 });
	/*
	 $('#filter_time .btn_filter').on('click',function(){
		  	$('#filter_time .btn_filter').toggleClass('btn_active');

	 });
	 */
	
	 $('#filter_type .btn_filter').on('click',function(){
			//$('#filter_type .btn_filter').toggleClass('btn_active');  
		 
			$('#filter_type').children().removeClass('btn_active');
		 	$(this).addClass('btn_active');
			loading_search();
			filteredSearch();
	 });

             });

/*
function changeActive(var event)
{
	$('#filter_type').children().removeClass('btn_active');
	alert(event);
}
*/

$(document).on('click','.search_group_btn', function(){
	
	loading_search();
});


function loading_search(){
	document.getElementById("loader").style.display = "block";
	myVar = setTimeout(showPage, 2000);
	
}

function showPage() {
  document.getElementById("loader").style.display = "none";

}

// right click on the right sidebar
$(document).ready(function(){
	
	context.init({
    fadeSpeed: 100,
    filter: function ($obj){},
    above: 'auto',
    preventDoubleContext: true,
    compress: false
	});
	
	context.attach('#like', [
		{header: 'Options'},
		{text: 'Open', href: '#'},
		{text: 'Rename', href: '#'},
		{divider: true},
		{text: 'Move to', href: '#'},
		{text: 'Delete', href: '#'}
	]);
	
	/*
	context.attach('#like', [
		
		{header: 'Download'},
		{text: 'The Script', subMenu: [
			{header: 'Requires jQuery'},
			{text: 'context.js', href: 'http://lab.jakiestfu.com/contextjs/context.js', target:'_blank', action: function(e){
				_gaq.push(['_trackEvent', 'ContextJS Download', this.pathname, this.innerHTML]);
			}}
		]},
		{text: 'The Styles', subMenu: [
		
			{text: 'context.bootstrap.css', href: 'http://lab.jakiestfu.com/contextjs/context.bootstrap.css', target:'_blank', action: function(e){
				_gaq.push(['_trackEvent', 'ContextJS Bootstrap CSS Download', this.pathname, this.innerHTML]);
			}},
			
			{text: 'context.standalone.css', href: 'http://lab.jakiestfu.com/contextjs/context.standalone.css', target:'_blank', action: function(e){
				_gaq.push(['_trackEvent', 'ContextJS Standalone CSS Download', this.pathname, this.innerHTML]);
			}}
		]},
		{divider: true},
		{header: 'Meta'},
		{text: 'The Author', subMenu: [
			{header: '@jakiestfu'},
			{text: 'Website', href: 'http://jakiestfu.com/', target: '_blank'},
			{text: 'Forrst', href: 'http://forrst.com/people/jakiestfu', target: '_blank'},
			{text: 'Twitter', href: 'http://twitter.com/jakiestfu', target: '_blank'},
			{text: 'Donate?', action: function(e){
				e.preventDefault();
				$('#donate').submit();
			}}
		]},
		{text: 'Hmm?', subMenu: [
			{header: 'Well, thats lovely.'},
			{text: '2nd Level', subMenu: [
				{header: 'You like?'},
				{text: '3rd Level!?', subMenu: [
					{header: 'Of course you do'},
					{text: 'MENUCEPTION', subMenu: [
						{header:'FUCK'},
						{text: 'MAKE IT STOP!', subMenu: [
							{header: 'NEVAH!'},
							{text: 'Shieeet', subMenu: [
								{header: 'WIN'},
								{text: 'Dont Click Me', href: 'http://bit.ly/1dH1Zh1', target:'_blank', action: function(){
									_gaq.push(['_trackEvent', 'ContextJS Weezy Click', this.pathname, this.innerHTML]);
								}}
							]}
						]}
					]}
				]}
			]}
		]}
	]);
	
	*/
	context.settings({compress: true});
	
	/*
	context.attach('html', [
		{header: 'Compressed Menu'},
		{text: 'Back', href: '#'},
		{text: 'Reload', href: '#'},
		{divider: true},
		{text: 'Save As', href: '#'},
		{text: 'Print', href: '#'},
		{text: 'View Page Source', href: '#'},
		{text: 'View Page Info', href: '#'},
		{divider: true},
		{text: 'Inspect Element', href: '#'},
		{divider: true},
		{text: 'Disable This Menu', action: function(e){
			e.preventDefault();
			context.destroy('html');
			alert('html contextual menu destroyed!');
		}},
		{text: 'Donate?', action: function(e){
			e.preventDefault();
			$('#donate').submit();
		}}
		]);
		*/
	
	

	
});