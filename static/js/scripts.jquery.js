 
$(function(){
    $('[data-toggle="popover"]').popover({
      trigger: 'focus'
    });
    $('.tabs-wrapper ul#pills-tab li a.nav-link-icon').on('click', function(e) {
      e.preventDefault();
      var text = $(this).attr("href");
      $('.tabs-wrapper ul#pills-tab li').removeClass('active');
      $('.tabs-wrapper ul#pills-tab li').find('a.nav-link').each(function() {
        var subtext = $(this).attr("href");
        if (subtext==text) {
          $(this).addClass('active');
          $(this).parent('li').addClass('active');
        }
      });
      $('.tabs-wrapper ul.bottom-tabs-nav li').removeClass('active');
      $('.tabs-wrapper ul.bottom-tabs-nav').find('li').each(function() {
        var subtext = $(this).attr("data-url");
        if (subtext==text) {
          $(this).addClass('active');
          //$(this).parent('li').addClass('active');
        }
      });
      $(this).parent('li').removeClass('active');
      $(this).removeClass('active');
     

      });

    $('.tabs-wrapper ul.bottom-tabs-nav li a').on('click', function() {
        $(".tabs-wrapper ul#pills-tab li a."+$(this).attr("data-click")).trigger('click');
    });

});


$(document).ready(function(){
 var stickyTop = $('.sticky').offset().top;

  $(window).scroll(function() {
    var windowTop = $(window).scrollTop();

    if (stickyTop < windowTop) {
      $('.sticky').css('position', 'fixed');
      $('.sticky').addClass('is_stuck');
      $('#container').css('margin-top',$('#header').outerHeight(true));
    } else {
      $('.sticky').css('position', 'relative');
      $('.sticky').removeClass('is_stuck');
      $('#container').css('margin-top',0);
    }
  });
  // Add smooth scrolling to all links
  $("a.scrollable").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top - $('#header').height() * 1.5
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        //window.location.hash = hash;
      });
      return false;
    } // End if
  });

  $('.btn-group label.flex-fill').on('click', function() {
      $('.btn-group label.flex-fill').removeClass('active');
      $(this).addClass('active');
  });
});