$(document).ready(function() {
  $("#project-occupy-a-pool").on("click", function() {
    $("body").addClass("modal-open");
    $("#blank-screen").show();
    $("#showcase-occupy-a-pool").show();
  });

  $("#blank-screen").on("click", function() {
    $("#showcase-occupy-a-pool").hide();
    $("#blank-screen").hide();
    $("body").removeClass("modal-open");
  });
  
   $('a[href*=#]:not([href=#])').on("click", function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});