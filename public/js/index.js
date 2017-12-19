// Create the search box and link it to the UI element.
function initAutocomplete() {
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);

  searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        places.forEach(function(place) {
            var location = place.geometry.location;
            lat = location.lat();
            lng = location.lng();
            document.getElementById('latInput').value=lat; 
            document.getElementById('lngInput').value=lng;  
        });
  });
}

function validateSearch() {
  var milesRadius = document.getElementById('milesRadius').value;
  var latInput = document.getElementById('latInput').value;
  var lngInput = document.getElementById('lngInput').value;
  var testPass = true;
  
  if(isNaN(milesRadius))  {
    testPass = false;
    alert("Please enter a valid number");
  }
  if(milesRadius < 0 || milesRadius > 3000) {
    testPass = false;
    alert("Distance must be less than 3000 miles");
  }
  if((typeof lat === 'undefined' || typeof lng === 'undefined') || (lat != latInput || lng != lngInput))  {
    testPass = false;
    alert("Please select a valid location from the dropdown");
  }

  return testPass;
}

function validateAdvancedSearch() {
  var milesRadius = document.getElementById('milesRadius').value;
  var latInput = document.getElementById('latInput').value;
  var lngInput = document.getElementById('lngInput').value;
  var bedsMin = document.getElementById('bedsMin').value;
  var bedsMax = document.getElementById('bedsMax').value;
  var bathsMin = document.getElementById('bathsMin').value;
  var bathsMax = document.getElementById('bathsMax').value;
  var sqFtMin = document.getElementById('sqFtMin').value;
  var sqFtMax = document.getElementById('sqFtMax').value;
  var lotSqFtMin = document.getElementById('lotSqFtMin').value;
  var lotSqFtMax = document.getElementById('lotSqFtMax').value;
  var yearBuiltMin = document.getElementById('yearBuiltMin').value;
  var yearBuiltMax = document.getElementById('yearBuiltMax').value;
  var hoaMin = document.getElementById('hoaMin').value;
  var hoaMax = document.getElementById('hoaMax').value;
  var lotType = document.getElementById('lotType').value;
  var priceMin = document.getElementById('priceMin').value;
  var priceMax = document.getElementById('priceMax').value;
  var testPass = true;
  
  if(isNaN(milesRadius))  {
    testPass = false;
    alert("Please enter a valid number");
  }
  if(milesRadius < 0 || milesRadius > 3000) {
    testPass = false;
    alert("Distance must be less than 3000 miles");
  }
  if((typeof lat === 'undefined' || typeof lng === 'undefined') || (lat != latInput || lng != lngInput))  {
    testPass = false;
    alert("Please select a valid location from the dropdown");
  }
  if(bedsMin < 0 || bedsMin > 20 || bedsMax < 0 || bedsMax > 20) {
    testPass = false;
    alert("Beds input incorrect");
  }
  if(bathsMin < 0 || bathsMin > 20 || bathsMax < 0 || bathsMax > 20) {
    testPass = false;
    alert("Baths input incorrect");
  }
  if(sqFtMin < 0 || sqFtMin > 1000000 || sqFtMax < 0 || sqFtMax > 1000000) {
    testPass = false;
    alert("Square feet input incorrect");
  }
  if(lotSqFtMin < 0 || lotSqFtMin > 1000000 || lotSqFtMax < 0 || lotSqFtMax > 1000000) {
    testPass = false;
    alert("Lot square feet input incorrect");
  }
  if(yearBuiltMin < 0 || yearBuiltMin > new Date().getFullYear() || yearBuiltMax < 0 || yearBuiltMax > new Date().getFullYear()) {
    testPass = false;
    alert("Year built input incorrect");
  }
  if(hoaMin < 0 || hoaMin > 10000 || hoaMax < 0 || hoaMax > 10000) {
    testPass = false;
    alert("Hoa input incorrect");
  }
  if(priceMin < 0 || priceMin > 1000000000 || priceMax < 0 || priceMax > 1000000000) {
    testPass = false;
    alert("Price input incorrect");
  }
  return testPass;
}

$("#openAdvancedSearchBtn").click(function(){
  var currentAction = $('#buyBtn').hasClass('active') ? "forSale/" : "/rent/";
  if($('#advancedSearchInputs').css('display') == 'none') {
    $('#advancedSearchInputs').css('display', 'block');
    $('#openAdvancedSearchBtn').text('▲ Advanced Search');
    $("#searchForm").attr("action", currentAction + 'advancedSearch/');
    $("#searchForm").attr("onsubmit", 'return validateAdvancedSearch()');
    $('#advancedSearchInputs :input').each(function(){
      $(this).attr("required", true);
    })

  } else  {
    $('#advancedSearchInputs').css('display', 'none');
    $('#openAdvancedSearchBtn').text('▼ Advanced Search');
    $("#searchForm").attr("action", currentAction);
    $("#searchForm").attr("onsubmit", 'return validateSearch()');
    $('#advancedSearchInputs :input').each(function(){
      $(this).attr("required", false);
    })
  }
});

$(".btn-group > .btn").click(function(){
  var action = $(this).text();
  var advancedSearch = '/advancedSearch/';
  action = "forSale";
  $("#searchForm").attr("action", "/" + action + advancedSearch);
});

$('#searchForm').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    return false;
  }
});


// /* gallery functionality */

// $(document).ready(function(){

//     $(".filter-button").click(function(){
//         var value = $(this).attr('data-filter');
        
//         if(value == "all")
//         {
//             //$('.filter').removeClass('hidden');
//             $('.filter').show('1000');
//         }
//         else
//         {
// //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
// //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
//             $(".filter").not('.'+value).hide('3000');
//             $('.filter').filter('.'+value).show('3000');
            
//         }
//     });
    
//     if ($(".filter-button").removeClass("active")) {
// $(this).removeClass("active");
// }
// $(this).addClass("active");

// });

// //run function once page is loaded
// (function() {
//     var po = document.createElement('script'); po.type = 'text/javascript'; 
//         po.async = true;
//     po.src = 'https://apis.google.com/js/platform.js';

//     var s = document.getElementsByTagName('script')[0]; 
//     s.parentNode.insertBefore(po, s);
//   })();






