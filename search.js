$(document).ready(function() {
   
   $('form').submit(function (e){
     e.preventDefault();
     var $searchTerm = $('#search');
     var $submitButton =$('#submit');
     
     //disabling the search field     
     $searchTerm.prop('disabled',true);
     $submitButton.attr('disabled',true).val("Searching ...");
    
 

    // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var term = $searchTerm.val();
       
    if(term===""){
        alert("Please type a term of your choice!");
        enable();
    }else{   
    var flickrOptions = {
      tags: term,
      format: "json"
    };
    function displayPhotos(data) {
      var photoHTML = '<ul>';
      $.each(data.items,function(i,photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
      enable();
     
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);
    }   
    
     //enabling the search field   
    function enable(){
      $searchTerm.prop('disabled',false);
      $submitButton.attr('disabled',false).val('Search');
    
}   

  }); // end click

}); // end ready

