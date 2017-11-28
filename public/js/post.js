function initAutocomplete() {
  var input = document.getElementById('formattedAddress');
  var searchBox = new google.maps.places.SearchBox(input);

  searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        places.forEach(function(place) {
            var location = place.geometry.location;
            // var zipCodeFound = false;
            for (var i = 0; i < place.address_components.length; i++) {
                for (var j = 0; j < place.address_components[i].types.length; j++) {
                  if (place.address_components[i].types[j] == "street_number") {
                    streetNumber = place.address_components[i].long_name;
                    if(typeof streetNumber !== 'undefined') {
            streetNumber = place.address_components[i].long_name;
          }
                  }
              }
            }


            lat = location.lat();
            lng = location.lng();
            formattedAddress = place.formatted_address;
            console.log(formattedAddress);
            document.getElementById('latInput').value=lat; 
            document.getElementById('lngInput').value=lng;  
            document.getElementById('formattedAddress').value=formattedAddress; 
        });
  });
}

function postValidation() {
  
  var latInput = document.getElementById('latInput').value;
  var lngInput = document.getElementById('lngInput').value;
  var beds = document.getElementById('beds').value;
  var baths = document.getElementById('baths').value;
  var sqFt = document.getElementById('sqFt').value;
  var lotSqFt = document.getElementById('lotSqFt').value;
  var yearBuilt = document.getElementById('yearBuilt').value;
  var hoa = document.getElementById('hoa').value;
  var lotType = document.getElementById('lotType').value;
  var price = document.getElementById('price').value;
  var description = document.getElementById('description').value;

  var testPass = true;

  if((typeof lat === 'undefined' || typeof lng === 'undefined') || (lat != latInput || lng != lngInput))  {
    testPass = false;
    alert("Please select a valid location from the dropdown");
  }
  if(beds < 0 || beds > 20) {
    testPass = false;
    alert("Beds input incorrect");
  }
  if(baths < 0 || baths > 20) {
    testPass = false;
    alert("Baths input incorrect");
  }
  if(sqFt < 0 || sqFt > 1000000) {
    testPass = false;
    alert("Square feet input incorrect");
  }
  if(lotSqFt < 0 || lotSqFt > 1000000) {
    testPass = false;
    alert("Lot square feet input incorrect");
  }
  if(yearBuilt < 0 || yearBuilt > new Date().getFullYear()) {
    testPass = false;
    alert("Year built input incorrect");
  }
  if(hoa < 0 || hoa > 10000) {
    testPass = false;
    alert("Hoa input incorrect");
  }
  if(description.length < 0 || description.length > 255) {
    testPass = false;
    alert("Description input incorrect. Must be less than 255 characters.");
  }
  if(price < 0 || price > 1000000000) {
    testPass = false;
    alert("Price input incorrect");
  }
  return testPass;
}


$('#postForm').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    return false;
  }
});