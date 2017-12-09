
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
                 $('#sidebarCollapse').on('click', function () {
                     $('#sidebar').toggleClass('active');
                 });
             });
