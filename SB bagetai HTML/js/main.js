$(document).ready(function() {
  // Scroll Events
  $(window).scroll(function() {
    var wScroll = $(this).scrollTop();

    // Activate menu
    if (wScroll > 20) {
      $("#main-nav").addClass("active");
      $("#slide_out_menu").addClass("scrolled");
    } else {
      $("#main-nav").removeClass("active");
      $("#slide_out_menu").removeClass("scrolled");
    }

    //Scroll Effects
  });

  // Navigation
  $("#navigation").on("click", function(e) {
    e.preventDefault();
    $(this).addClass("open");
    $("#slide_out_menu").toggleClass("open");

    if ($("#slide_out_menu").hasClass("open")) {
      $(".menu-close").on("click", function(e) {
        e.preventDefault();
        $("#slide_out_menu").removeClass("open");
      });
    }
  });

  // Price Table
  var individual_price_table = $("#price_tables").find(".individual");
  var company_price_table = $("#price_tables").find(".company");

  $(".switch-toggles")
    .find(".individual")
    .addClass("active");
  $("#price_tables")
    .find(".individual")
    .addClass("active");

  $(".switch-toggles")
    .find(".individual")
    .on("click", function() {
      $(this).addClass("active");
      $(this)
        .closest(".switch-toggles")
        .removeClass("active");
      $(this)
        .siblings()
        .removeClass("active");
      individual_price_table.addClass("active");
      company_price_table.removeClass("active");
    });

  $(".switch-toggles")
    .find(".company")
    .on("click", function() {
      $(this).addClass("active");
      $(this)
        .closest(".switch-toggles")
        .addClass("active");
      $(this)
        .siblings()
        .removeClass("active");
      company_price_table.addClass("active");
      individual_price_table.removeClass("active");
    });

  // Wow Animations
  wow = new WOW({
    boxClass: "wow", // default
    animateClass: "animated", // default
    offset: 0, // default
    mobile: true, // default
    live: true, // default
  });
  wow.init();

  // Menu For Xs Mobile Screens
  if ($(window).height() < 450) {
    $("#slide_out_menu").addClass("xs-screen");
  }

  $(window).on("resize", function() {
    if ($(window).height() < 450) {
      $("#slide_out_menu").addClass("xs-screen");
    } else {
      $("#slide_out_menu").removeClass("xs-screen");
    }
  });

  // Magnific Popup
  $(".lightbox").magnificPopup();
});

$(document).ready(function() {
  $(".images-list").slick({
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });
});

$(function() {
  function after_form_submitted(data) {
    if (data.result == "success") {
      $("form#reused_form").hide();
      $("#success_message").show();
      $("#error_message").hide();
    } else {
      $("#error_message").append("<ul></ul>");

      jQuery.each(data.errors, function(key, val) {
        $("#error_message ul").append("<li>" + key + ":" + val + "</li>");
      });
      $("#success_message").hide();
      $("#error_message").show();

      //reverse the response on the button
      $('button[type="button"]', $form).each(function() {
        $btn = $(this);
        label = $btn.prop("orig_label");
        if (label) {
          $btn.prop("type", "submit");
          $btn.text(label);
          $btn.prop("orig_label", "");
        }
      });
    } //else
  }

  $("#reused_form").submit(function(e) {
    e.preventDefault();

    $form = $(this);
    //show some response on the button
    $('button[type="submit"]', $form).each(function() {
      $btn = $(this);
      $btn.prop("type", "button");
      $btn.prop("orig_label", $btn.text());
      $btn.text("Sending ...");
    });

    var formdata = new FormData(this);
    $.ajax({
      type: "POST",
      url: "handler.php",
      data: formdata,
      success: after_form_submitted,
      dataType: "json",
      processData: false,
      contentType: false,
      cache: false,
    });
  });
});

// FORM HANDLING
