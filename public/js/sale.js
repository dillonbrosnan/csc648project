$(".btn-group > .btn").click(function(){
$(this).addClass("active").siblings().removeClass("active");
var action = $(this).text();
if(action == "Show Map") {
  $(".listContainer").hide();
  $(".mapContainer").show();
} else  {
  $(".mapContainer").hide();
  $(".listContainer").show();
}
});

$( window ).resize(function() {
if($( window ).width() >= 992)  {
  $(".listContainer").show();
  $(".mapContainer").show();
}
});


    // //set distance to every location on window load
    // (function addEventsAndStuff() {
    //  setLocationforListing(); 
    // })();

    //sort listings based on price acending order
    function acendingsort() {
        var listSection = document.getElementsByClassName('listContainer');
        
        for(let i = 0; i < listSection[0].children.length; i++){
          if(listSection[0].children[i].className == 'row'){
            var parent = listSection[0].children[i]; 
          }
        }

        var children = [];
        for (var i = 0; i < parent.childNodes.length; i++) {
            if (parent.childNodes[i].className == "col-lg-4 col-md-4 col-sm-6") {
              children.push(parent.childNodes[i]); 
            }        
        }
        let childrenLength = children.length; 
        var prices = [], i, len;

        for (i = 0, len = children.length; i < len; i++) {
          prices.push(parseInt(children[i].attributes[1].value, 10));
        }
        prices.sort(function(a, b) {return(a - b);});

         for (i = 0, len = prices.length; i < len; i++) {
             parent.appendChild(findChild(prices[i], children));
             $(listSection.parent).hide().appendTo(document.body.listSection).fadeIn(200);
         }
         document.getElementById("sortingbutton").setAttribute('onclick',  'decendingsort()');
         document.getElementById("sortingbutton").innerHTML = 'Prices <i class="fa fa-angle-double-up" aria-hidden="true"></i>';
    }
    //sort listings based on price in desending order
    function decendingsort() {
      var listSection = document.getElementsByClassName('listContainer');
      
      for(let i = 0; i < listSection[0].children.length; i++){
        if(listSection[0].children[i].className == 'row'){
          var parent = listSection[0].children[i]; 
        }
      }
        var children = [];
        for (var i = 0; i < parent.childNodes.length; i++) {
            if (parent.childNodes[i].className == "col-lg-4 col-md-4 col-sm-6") {
              children.push(parent.childNodes[i]); 
            }        
        }
        let childrenLength = children.length; 
        var prices = [], i, len;
        
        for (i = 0, len = children.length; i < len; i++) {
          prices.push(parseInt(children[i].attributes[1].nodeValue, 10));
        }
        prices.sort(function(a, b) {return(b - a);});

         for (i = 0, len = prices.length; i < len; i++) {
             parent.appendChild(findChild(prices[i], children));
             $(listSection.parent).hide().appendTo(document.body).fadeIn(200);
         }
         document.getElementById("sortingbutton").setAttribute('onclick',  'acendingsort()');
         document.getElementById("sortingbutton").innerHTML = 'Prices <i class="fa fa-angle-double-down" aria-hidden="true">';
    }
    // //convert lat and lng to distance from each search result
    // function getDistance(lat2,lon2) {
    //   let lat1 = <%- lat %>, 
    //       lon1 = <%- lon %>;
          
    //   var R = 6371; // Radius of the earth in km
    //   var dLat = deg2rad(lat2-lat1);  // deg2rad below
    //   var dLon = deg2rad(lon2-lon1); 
    //   var a = 
    //           Math.sin(dLat/2) * Math.sin(dLat/2) +
    //           Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    //           Math.sin(dLon/2) * Math.sin(dLon/2); 

    //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    //   var d = R * c; // Distance in km
    //   return d;
    // }
    // //convert degrees to radians
    // function deg2rad(deg) {
    //   return deg * (Math.PI/180)
    // }

    // //sets the distance property to each listing 
    // function setLocationforListing(){
    //   var listSection = document.getElementsByClassName('listContainer');
        
    //     for(let i = 0; i < listSection[0].children.length; i++){
    //       if(listSection[0].children[i].className == 'row'){
    //         var parent = listSection[0].children[i]; 
    //       }
    //     }

    //     var children = [];
    //     //get all childNodes
    //     for (var i = 0; i < parent.childNodes.length; i++) {
    //         if (parent.childNodes[i].className == "col-lg-4 col-md-4 col-sm-6") {
    //           children.push(parent.childNodes[i]); 
    //         }        
    //     }


    //     let childrenLength = children.length; 
    //     var location = [], i, len;
        
    //     for (i = 0, len = children.length; i < len; i++) {
    //       location.push(getDistance(children[i].attributes[2].nodeValue, children[i].attributes[3].nodeValue));
    //     }

    //     for(let i = 0; i < location.length; i++){
    //       var att = document.createAttribute("distance");       // Create a "class" attribute
    //       att.value = location[i];                           // Set the value of the class attribute
    //       children[i].setAttributeNode(att);                          // Add the class attribute to <h1>
    //     }
    // }

    //find houses nearest the users search input location
    function locationDecendingSort() {
        var listSection = document.getElementsByClassName('listContainer');
        
        for(let i = 0; i < listSection[0].children.length; i++){
          if(listSection[0].children[i].className == 'row'){
            var parent = listSection[0].children[i]; 
          }
        }

        var children = [];
        //get all childNodes
        for (var i = 0; i < parent.childNodes.length; i++) {
            if (parent.childNodes[i].className == "col-lg-4 col-md-4 col-sm-6") {
              children.push(parent.childNodes[i]); 
            }        
        }
        let childrenLength = children.length; 
        var distance = [], i, len;
        
        for (i = 0, len = children.length; i < len; i++) {
          distance.push(children[i].attributes[4].nodeValue);
        }

        distance.sort(function(a, b) {return(a - b);});

         for (i = 0, len = distance.length; i < len; i++) {
             parent.appendChild(findChild(distance[i], children));
             $(listSection.parent).hide().appendTo(document.body).fadeIn(200);
         }

        //  document.getElementById("sortLocation").setAttribute('onclick',  'locationAsendingSort()');
        //  document.getElementById("sortLocation").innerHTML = 'Location <i class="fa fa-location-arrow" aria-hidden="true"></i>';
    }
    
    //find houses further the users search input location
    function locationAsendingSort() {
      var listSection = document.getElementsByClassName('listContainer');
        
        for(let i = 0; i < listSection[0].children.length; i++){
          if(listSection[0].children[i].className == 'row'){
            var parent = listSection[0].children[i]; 
          }
        }

        var children = [];
        for (var i = 0; i < parent.childNodes.length; i++) {
            if (parent.childNodes[i].className == "col-lg-4 col-md-4 col-sm-6") {
              children.push(parent.childNodes[i]); 
            }        
        }
        let childrenLength = children.length; 
        var distance = [], i, len;
        
        for (i = 0, len = children.length; i < len; i++) {
          distance.push(parseInt(children[i].attributes[1].nodeValue, 10));
        }
        distance.sort(function(a, b) {return(b - a);});

         for (i = 0, len = distance.length; i < len; i++) {
             parent.appendChild(findChild(distance[i], children));
             $(listSection.parent).hide().appendTo(document.body).fadeIn(200);
         }
         document.getElementById("sortLocation").setAttribute('onclick',  'locationDecendingSort()');
         document.getElementById("sortLocation").innerHTML = 'Location <i class="fa fa-map-marker" aria-hidden="true"></i>';
    }

    //helper function to find child divs of parent class
    function findChild(value, children){
      for(let i = 0; i < children.length; i++){
        for(let j = 1; j < children[i].attributes.length; j++){

          if(children[i].attributes[j].name == 'price'){
            if(children[i].attributes[j].nodeValue == value)
            return children[i]; 
          } else if (children[i].attributes[j].name == 'distance'){
            if(children[i].attributes[j].nodeValue == value){
              return children[i]; 
            }
          }
        }
      }
    }

