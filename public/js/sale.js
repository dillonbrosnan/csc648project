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