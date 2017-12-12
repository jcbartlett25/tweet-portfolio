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
	 loading_search();
	 
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
	$(document).on('click','.btn_self', function(){
		$(this).addClass('btn_active');
	});
	 
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
  $('.btn_self').removeClass('btn_active');
}
	
});