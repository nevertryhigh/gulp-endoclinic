"use strict";

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
"use strict";
"use strict";

var scrollChange = 1;
$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll >= scrollChange) {
    $('.header').addClass('js-scroll-down');
    $('.header').removeClass('js-scroll-top');
  } else {
    $('.header').removeClass('js-scroll-down').removeClass('js-nav-open').removeClass('js-nav-close');
    $('.header').addClass('js-scroll-top');
  }
}); // Media 992 =====>

if (window.matchMedia("(min-width: 992px)").matches) {
  $('.burger').click(function () {
    if ($('.header').hasClass('js-nav-open')) {
      $('.header').removeClass('js-nav-open');
      $('.header').addClass('js-nav-close');
    } else {
      $('.header').addClass('js-nav-open');
      $('.header').removeClass('js-nav-close');
    }
  });
} else {
  $('.burger').click(function () {
    $('.header').toggleClass('js-nav-open');
    $('body').toggleClass('js-lock');
  });
}
"use strict";

// Auto size textarea =====>
var textarea = document.querySelector('textarea');
textarea.addEventListener('keydown', autosizeTextarea);

function autosizeTextarea() {
  var el = this;
  setTimeout(function () {
    el.style.cssText = 'height:auto; padding:0';
    el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  }, 0);
} // Custom select =====>


$('select').each(function () {
  var $this = $(this),
      numberOfOptions = $(this).children('option').length;
  $this.addClass('select__hidden');
  $this.wrap('<div class="select"></div>');
  $this.after('<div class="select__styled"></div>');
  var $styledSelect = $this.next('div.select__styled');
  $styledSelect.text($this.children('option').eq(0).text());
  $styledSelect.append('<i class="icon-arrow-dropdown"></i>');
  var $list = $('<ul />', {
    'class': 'select__options'
  }).insertAfter($styledSelect);

  for (var i = 0; i < numberOfOptions; i++) {
    $('<li />', {
      text: $this.children('option').eq(i).text(),
      rel: $this.children('option').eq(i).val()
    }).appendTo($list);
  }

  var $listItems = $list.children('li');
  $styledSelect.click(function (e) {
    e.stopPropagation();
    $('div.select__styled.active').not(this).each(function () {
      $(this).removeClass('active').next('ul.select__options').slideUp(300);
    });
    $(this).toggleClass('active').next('ul.select__options').slideToggle(300);
  });
  $listItems.click(function (e) {
    e.stopPropagation();
    $styledSelect.text($(this).text()).removeClass('active');
    $this.val($(this).attr('rel'));
    $list.slideUp(300);
  });
  $(document).click(function () {
    $styledSelect.removeClass('active');
    $list.slideUp(300);
  });
});
"use strict";
"use strict";

$('.show__trigger').click(function () {
  $(this).parent().find('.show__item').toggle();
  $(this).toggleClass('js-active');

  if ($(this).hasClass('js-active')) {
    $(this).find('span').text('See less');
  } else {
    $(this).find('span').text('See all');
  }
});
"use strict";
"use strict";
"use strict";

var sliderPractices = new Swiper('.practices-slider', {
  slidesPerView: 1,
  spaceBetween: 40,
  navigation: {
    nextEl: ".practices-button-next",
    prevEl: ".practices-button-prev"
  },
  pagination: {
    el: ".practices-pagination"
  },
  breakpoints: {
    768: {
      slidesPerView: 2
    }
  }
});
"use strict";

// Media 992 =====>
if (window.matchMedia("(min-width: 992px)").matches) {
  $('.technology-card').click(function () {
    $(".technology-card").not($(this).closest(".technology-card")).removeClass("js-active");
    $(this).closest(".technology-card").addClass("js-active");

    if ($(this).hasClass('js-active')) {
      $('.technology-card__body').not($(this).find('.technology-card__body')).slideUp(300);
      $(this).find('.technology-card__body').slideDown(300);
    }
  });
} else {
  $('.technology-card').removeClass('js-active');
  $('.technology-card').click(function () {
    $(this).toggleClass('js-active');
    $('.technology-card').not($(this)).removeClass('js-active');
  });
}
"use strict";

var sliderTestimonials = new Swiper('.testimonials-slider', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".testimonials-button-next",
    prevEl: ".testimonials-button-prev"
  },
  pagination: {
    el: ".testimonials-pagination"
  },
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 'auto',
      centeredSlides: true
    }
  }
});
"use strict";

// Media 992 =====>
if (window.matchMedia("(min-width: 992px)").matches) {
  window.homepagecheck = function () {
    var check = false;

    if (document.location.pathname === "/" || document.location.pathname === "/index.html") {
      check = true;
    }

    return check;
  };

  if (window.homepagecheck()) {
    // Horizontal scroll in Treatments =====>
    gsap.registerPlugin(ScrollTrigger);
    var sections = gsap.utils.toArray(".treatments-wrapper");
    var maxWidth = 0;

    var getMaxWidth = function getMaxWidth() {
      maxWidth = 0;
      sections.forEach(function (section) {
        maxWidth += section.offsetWidth;
      });
    };

    getMaxWidth();
    ScrollTrigger.addEventListener("refreshInit", getMaxWidth);
    var triggerItem = document.querySelector('.treatments');
    gsap.to(sections, {
      x: function x() {
        return "-".concat(maxWidth - window.innerWidth);
      },
      ease: "none",
      scrollTrigger: {
        start: "-120px top",
        trigger: triggerItem,
        pin: true,
        scrub: true,
        end: function end() {
          return "+=".concat(maxWidth);
        },
        invalidateOnRefresh: true
      }
    });
    sections.forEach(function (sct, i) {
      ScrollTrigger.create({
        trigger: sct,
        start: function start() {
          return 'top top-=' + (sct.offsetLeft - window.innerWidth / 2) * (maxWidth / (maxWidth - window.innerWidth));
        },
        end: function end() {
          return '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth));
        },
        toggleClass: {
          targets: sct,
          className: "active"
        }
      });
    });
  } else {
    null;
  }
} else {
  var sliderTreatments = new Swiper('.treatments-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".treatments-button-next",
      prevEl: ".treatments-button-prev"
    },
    pagination: {
      el: ".treatments-pagination"
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      }
    }
  });
}
"use strict";
"use strict";

var sliderCases = new Swiper('.cases-slider', {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".cases-button-next",
    prevEl: ".cases-button-prev"
  },
  pagination: {
    el: ".cases-pagination"
  },
  breakpoints: {
    768: {
      slidesPerView: 2
    }
  }
});
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Custom scrollbar in tooth table =====>
document.addEventListener("DOMContentLoaded", function () {
  OverlayScrollbars(document.querySelectorAll(".tooth"), {});
}); // Input Files =====>

var dt = new DataTransfer();
$(".files-trigger__input").on('change', function (e) {
  for (var i = 0; i < this.files.length; i++) {
    var filesWrapper = $('<div/>', {
      class: 'files__wrapper'
    });
    var filesItem = $('<div/>', {
      class: 'files-item'
    }),
        fileName = $('<span/>', {
      class: 'files-item__name',
      text: this.files.item(i).name
    });
    filesItem.append('<i class="icon-file"></i>').append(fileName).append('<i class="files-item__remove icon-trash-can"></i>');
    filesWrapper.append(filesItem);
    $(".files__table").append(filesWrapper).css('display', 'flex');
    $('.files').css('margin-bottom', '48px');
  }

  ;

  var _iterator = _createForOfIteratorHelper(this.files),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var file = _step.value;
      dt.items.add(file);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  this.files = dt.files;
  $('.files-item__remove').click(function () {
    var name = $(this).next('.files-item__name').text();
    $(this).parents('.files__wrapper').remove();

    for (var _i = 0; _i < dt.items.length; _i++) {
      if (name === dt.items[_i].getAsFile().name) {
        dt.items.remove(_i);
        continue;
      }
    }

    document.getElementsByClassName('files-trigger__input').files = dt.files;
  });
});
"use strict";
"use strict";
"use strict";

var sliderSocials = new Swiper('.socials__slider', {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".socials-button-next",
    prevEl: ".socials-button-prev"
  },
  pagination: {
    el: ".socials-pagination"
  },
  breakpoints: {
    768: {
      slidesPerView: 2
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJibG9ja3MvZm9vdGVyL2Zvb3Rlci5qcyIsImJsb2Nrcy9oZWFkZXIvaGVhZGVyLmpzIiwiVUkvY29udGFjdHMtZm9ybS9jb250YWN0cy1mb3JtLmpzIiwiYmxvY2tzL2Fib3V0LXBhZ2UvYWJvdXQvYWJvdXQuanMiLCJibG9ja3MvY29udGFjdHMtcGFnZS9jb250YWN0cy9jb250YWN0cy5qcyIsImJsb2Nrcy9ob21lLXBhZ2UvYWJvdXQvYWJvdXQuanMiLCJibG9ja3MvaG9tZS1wYWdlL2xvY2F0aW9ucy9sb2NhdGlvbnMuanMiLCJibG9ja3MvaG9tZS1wYWdlL3ByYWN0aWNlcy9wcmFjdGljZXMuanMiLCJibG9ja3MvaG9tZS1wYWdlL3RlY2hub2xvZ3kvdGVjaG5vbG9neS5qcyIsImJsb2Nrcy9ob21lLXBhZ2UvdGVzdGltb25pYWxzL3Rlc3RpbW9uaWFscy5qcyIsImJsb2Nrcy9ob21lLXBhZ2UvdHJlYXRtZW50cy90cmVhdG1lbnRzLmpzIiwiYmxvY2tzL3JlZmVyaW5nLXBhZ2UvYWJvdXQvYWJvdXQuanMiLCJibG9ja3MvcmVmZXJpbmctcGFnZS9jYXNlcy9jYXNlcy5qcyIsImJsb2Nrcy9yZWZlcmluZy1wYWdlL2NvbnRhY3RzL2NvbnRhY3RzLmpzIiwiYmxvY2tzL3JlZmVyaW5nLXBhZ2UvaGVyby9oZXJvLmpzIiwiYmxvY2tzL3JlZmVyaW5nLXBhZ2UvcHJvbWlzZS9wcm9taXNlLmpzIiwiYmxvY2tzL3JlZmVyaW5nLXBhZ2Uvc29jaWFscy9zb2NpYWxzLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIm9uYmVmb3JldW5sb2FkIiwic2Nyb2xsVG8iLCJzY3JvbGxDaGFuZ2UiLCIkIiwic2Nyb2xsIiwic2Nyb2xsVG9wIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiY2xpY2siLCJoYXNDbGFzcyIsInRvZ2dsZUNsYXNzIiwidGV4dGFyZWEiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiYXV0b3NpemVUZXh0YXJlYSIsImVsIiwic2V0VGltZW91dCIsInN0eWxlIiwiY3NzVGV4dCIsInNjcm9sbEhlaWdodCIsImVhY2giLCIkdGhpcyIsIm51bWJlck9mT3B0aW9ucyIsImNoaWxkcmVuIiwibGVuZ3RoIiwid3JhcCIsImFmdGVyIiwiJHN0eWxlZFNlbGVjdCIsIm5leHQiLCJ0ZXh0IiwiZXEiLCJhcHBlbmQiLCIkbGlzdCIsImluc2VydEFmdGVyIiwiaSIsInJlbCIsInZhbCIsImFwcGVuZFRvIiwiJGxpc3RJdGVtcyIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJub3QiLCJzbGlkZVVwIiwic2xpZGVUb2dnbGUiLCJhdHRyIiwicGFyZW50IiwiZmluZCIsInRvZ2dsZSIsInNsaWRlclByYWN0aWNlcyIsIlN3aXBlciIsInNsaWRlc1BlclZpZXciLCJzcGFjZUJldHdlZW4iLCJuYXZpZ2F0aW9uIiwibmV4dEVsIiwicHJldkVsIiwicGFnaW5hdGlvbiIsImJyZWFrcG9pbnRzIiwiY2xvc2VzdCIsInNsaWRlRG93biIsInNsaWRlclRlc3RpbW9uaWFscyIsImxvb3AiLCJjZW50ZXJlZFNsaWRlcyIsImhvbWVwYWdlY2hlY2siLCJjaGVjayIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJnc2FwIiwicmVnaXN0ZXJQbHVnaW4iLCJTY3JvbGxUcmlnZ2VyIiwic2VjdGlvbnMiLCJ1dGlscyIsInRvQXJyYXkiLCJtYXhXaWR0aCIsImdldE1heFdpZHRoIiwiZm9yRWFjaCIsInNlY3Rpb24iLCJvZmZzZXRXaWR0aCIsInRyaWdnZXJJdGVtIiwidG8iLCJ4IiwiaW5uZXJXaWR0aCIsImVhc2UiLCJzY3JvbGxUcmlnZ2VyIiwic3RhcnQiLCJ0cmlnZ2VyIiwicGluIiwic2NydWIiLCJlbmQiLCJpbnZhbGlkYXRlT25SZWZyZXNoIiwic2N0IiwiY3JlYXRlIiwib2Zmc2V0TGVmdCIsInRhcmdldHMiLCJjbGFzc05hbWUiLCJzbGlkZXJUcmVhdG1lbnRzIiwic2xpZGVyQ2FzZXMiLCJPdmVybGF5U2Nyb2xsYmFycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkdCIsIkRhdGFUcmFuc2ZlciIsIm9uIiwiZmlsZXMiLCJmaWxlc1dyYXBwZXIiLCJjbGFzcyIsImZpbGVzSXRlbSIsImZpbGVOYW1lIiwiaXRlbSIsIm5hbWUiLCJjc3MiLCJmaWxlIiwiaXRlbXMiLCJhZGQiLCJwYXJlbnRzIiwicmVtb3ZlIiwiZ2V0QXNGaWxlIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInNsaWRlclNvY2lhbHMiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE1BQU0sQ0FBQ0MsY0FBUCxHQUF3QixZQUFZO0FBQ2xDRCxFQUFBQSxNQUFNLENBQUNFLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkI7QUFDRCxDQUZEO0FDQUE7OztBQ0FBLElBQUlDLFlBQVksR0FBRyxDQUFuQjtBQUNBQyxDQUFDLENBQUNKLE1BQUQsQ0FBRCxDQUFVSyxNQUFWLENBQWlCLFlBQVc7QUFDeEIsTUFBSUEsTUFBTSxHQUFHRCxDQUFDLENBQUNKLE1BQUQsQ0FBRCxDQUFVTSxTQUFWLEVBQWI7O0FBRUEsTUFBSUQsTUFBTSxJQUFJRixZQUFkLEVBQTRCO0FBQzFCQyxJQUFBQSxDQUFDLENBQUMsU0FBRCxDQUFELENBQWFHLFFBQWIsQ0FBc0IsZ0JBQXRCO0FBQ0FILElBQUFBLENBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYUksV0FBYixDQUF5QixlQUF6QjtBQUNELEdBSEQsTUFHTztBQUNMSixJQUFBQSxDQUFDLENBQUMsU0FBRCxDQUFELENBQWFJLFdBQWIsQ0FBeUIsZ0JBQXpCLEVBQTJDQSxXQUEzQyxDQUF1RCxhQUF2RCxFQUFzRUEsV0FBdEUsQ0FBa0YsY0FBbEY7QUFDQUosSUFBQUEsQ0FBQyxDQUFDLFNBQUQsQ0FBRCxDQUFhRyxRQUFiLENBQXNCLGVBQXRCO0FBQ0Q7QUFDSixDQVZELEUsQ0FZQTs7QUFDQSxJQUFJUCxNQUFNLENBQUNTLFVBQVAsQ0FBa0Isb0JBQWxCLEVBQXdDQyxPQUE1QyxFQUFxRDtBQUNu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QUFaLEdBQXdCUCxJQUFwQyxFQUF5QztBQUN4Q1QsUUFBQUEsRUFBRSxDQUFDWSxLQUFILENBQVNHLE1BQVQsQ0FBZ0IvRSxFQUFoQjtBQUNBO0FBQ0E7QUFDRDs7QUFDRHZCLElBQUFBLFFBQVEsQ0FBQ3dHLHNCQUFULENBQWdDLHNCQUFoQyxFQUF3RGQsS0FBeEQsR0FBZ0VILEVBQUUsQ0FBQ0csS0FBbkU7QUFDQSxHQVZEO0FBV0EsQ0E1QkQ7QUNSQTtBQ0FBOzs7QUNBQSxJQUFNZSxhQUFhLEdBQUcsSUFBSW5FLE1BQUosQ0FBVyxrQkFBWCxFQUErQjtBQUNuREMsRUFBQUEsYUFBYSxFQUFFLENBRG9DO0FBRW5EQyxFQUFBQSxZQUFZLEVBQUUsRUFGcUM7QUFHbkRDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxNQUFNLEVBQUUsc0JBREU7QUFFVkMsSUFBQUEsTUFBTSxFQUFFO0FBRkUsR0FIdUM7QUFPbkRDLEVBQUFBLFVBQVUsRUFBRTtBQUNWeEMsSUFBQUEsRUFBRSxFQUFFO0FBRE0sR0FQdUM7QUFVbkR5QyxFQUFBQSxXQUFXLEVBQUU7QUFDWCxTQUFLO0FBQ0hOLE1BQUFBLGFBQWEsRUFBRTtBQURaO0FBRE07QUFWc0MsQ0FBL0IsQ0FBdEIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XHJcbn0iLG51bGwsInZhciBzY3JvbGxDaGFuZ2UgPSAxO1xyXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICBpZiAoc2Nyb2xsID49IHNjcm9sbENoYW5nZSkge1xyXG4gICAgICAkKCcuaGVhZGVyJykuYWRkQ2xhc3MoJ2pzLXNjcm9sbC1kb3duJyk7XHJcbiAgICAgICQoJy5oZWFkZXInKS5yZW1vdmVDbGFzcygnanMtc2Nyb2xsLXRvcCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdqcy1zY3JvbGwtZG93bicpLnJlbW92ZUNsYXNzKCdqcy1uYXYtb3BlbicpLnJlbW92ZUNsYXNzKCdqcy1uYXYtY2xvc2UnKTtcclxuICAgICAgJCgnLmhlYWRlcicpLmFkZENsYXNzKCdqcy1zY3JvbGwtdG9wJyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gTWVkaWEgOTkyID09PT09PlxyXG5pZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiA5OTJweClcIikubWF0Y2hlcykge1xyXG4gICQoJy5idXJnZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoJCgnLmhlYWRlcicpLmhhc0NsYXNzKCdqcy1uYXYtb3BlbicpKSB7XHJcbiAgICAgICQoJy5oZWFkZXInKS5yZW1vdmVDbGFzcygnanMtbmF2LW9wZW4nKTtcclxuICAgICAgJCgnLmhlYWRlcicpLmFkZENsYXNzKCdqcy1uYXYtY2xvc2UnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoJy5oZWFkZXInKS5hZGRDbGFzcygnanMtbmF2LW9wZW4nKTtcclxuICAgICAgJCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdqcy1uYXYtY2xvc2UnKTtcclxuICAgIH1cclxuICB9KVxyXG59IGVsc2Uge1xyXG4gICQoJy5idXJnZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcuaGVhZGVyJykudG9nZ2xlQ2xhc3MoJ2pzLW5hdi1vcGVuJyk7XHJcbiAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ2pzLWxvY2snKTtcclxuICB9KVxyXG59IiwiLy8gQXV0byBzaXplIHRleHRhcmVhID09PT09PlxyXG52YXIgdGV4dGFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpO1xyXG5cclxudGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGF1dG9zaXplVGV4dGFyZWEpO1xyXG5cclxuZnVuY3Rpb24gYXV0b3NpemVUZXh0YXJlYSgpe1xyXG52YXIgZWwgPSB0aGlzO1xyXG5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICBlbC5zdHlsZS5jc3NUZXh0ID0gJ2hlaWdodDphdXRvOyBwYWRkaW5nOjAnO1xyXG4gICAgZWwuc3R5bGUuY3NzVGV4dCA9ICctbW96LWJveC1zaXppbmc6Y29udGVudC1ib3gnO1xyXG4gICAgZWwuc3R5bGUuY3NzVGV4dCA9ICdoZWlnaHQ6JyArIGVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcbn0sMCk7XHJcbn1cclxuXHJcbi8vIEN1c3RvbSBzZWxlY3QgPT09PT0+XHJcbiQoJ3NlbGVjdCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICB2YXIgJHRoaXMgPSAkKHRoaXMpLCBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGg7XHJcblxyXG4gICR0aGlzLmFkZENsYXNzKCdzZWxlY3RfX2hpZGRlbicpOyBcclxuICAkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwic2VsZWN0XCI+PC9kaXY+Jyk7XHJcbiAgJHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJzZWxlY3RfX3N0eWxlZFwiPjwvZGl2PicpO1xyXG5cclxuICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3RfX3N0eWxlZCcpO1xyXG4gICRzdHlsZWRTZWxlY3QudGV4dCgkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoMCkudGV4dCgpKTtcclxuICAkc3R5bGVkU2VsZWN0LmFwcGVuZCgnPGkgY2xhc3M9XCJpY29uLWFycm93LWRyb3Bkb3duXCI+PC9pPicpXHJcblxyXG4gIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcclxuICAgICAgJ2NsYXNzJzogJ3NlbGVjdF9fb3B0aW9ucydcclxuICB9KS5pbnNlcnRBZnRlcigkc3R5bGVkU2VsZWN0KTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xyXG4gICAgICAkKCc8bGkgLz4nLCB7XHJcbiAgICAgICAgICB0ZXh0OiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudGV4dCgpLFxyXG4gICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcclxuICAgICAgfSkuYXBwZW5kVG8oJGxpc3QpO1xyXG4gIH1cclxuXHJcbiAgdmFyICRsaXN0SXRlbXMgPSAkbGlzdC5jaGlsZHJlbignbGknKTtcclxuXHJcbiAgJHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICQoJ2Rpdi5zZWxlY3RfX3N0eWxlZC5hY3RpdmUnKS5ub3QodGhpcykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0X19vcHRpb25zJykuc2xpZGVVcCgzMDApO1xyXG4gICAgICB9KTtcclxuICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0X19vcHRpb25zJykuc2xpZGVUb2dnbGUoMzAwKTtcclxuICB9KTtcclxuXHJcbiAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAkdGhpcy52YWwoJCh0aGlzKS5hdHRyKCdyZWwnKSk7XHJcbiAgICAgICRsaXN0LnNsaWRlVXAoMzAwKTtcclxuICB9KTtcclxuXHJcbiAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICRzdHlsZWRTZWxlY3QucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAkbGlzdC5zbGlkZVVwKDMwMCk7XHJcbiAgfSk7XHJcblxyXG59KTsiLG51bGwsIiQoJy5zaG93X190cmlnZ2VyJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICQodGhpcykucGFyZW50KCkuZmluZCgnLnNob3dfX2l0ZW0nKS50b2dnbGUoKVxyXG4gICQodGhpcykudG9nZ2xlQ2xhc3MoJ2pzLWFjdGl2ZScpXHJcbiAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2pzLWFjdGl2ZScpKSB7XHJcbiAgICAkKHRoaXMpLmZpbmQoJ3NwYW4nKS50ZXh0KCdTZWUgbGVzcycpXHJcbiAgfSBlbHNlIHtcclxuICAgICQodGhpcykuZmluZCgnc3BhbicpLnRleHQoJ1NlZSBhbGwnKVxyXG4gIH1cclxufSkiLG51bGwsbnVsbCwiY29uc3Qgc2xpZGVyUHJhY3RpY2VzID0gbmV3IFN3aXBlcignLnByYWN0aWNlcy1zbGlkZXInLCB7XHJcbiAgc2xpZGVzUGVyVmlldzogMSxcclxuICBzcGFjZUJldHdlZW46IDQwLFxyXG4gIG5hdmlnYXRpb246IHtcclxuICAgIG5leHRFbDogXCIucHJhY3RpY2VzLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICBwcmV2RWw6IFwiLnByYWN0aWNlcy1idXR0b24tcHJldlwiLFxyXG4gIH0sXHJcbiAgcGFnaW5hdGlvbjoge1xyXG4gICAgZWw6IFwiLnByYWN0aWNlcy1wYWdpbmF0aW9uXCIsXHJcbiAgfSxcclxuICBicmVha3BvaW50czoge1xyXG4gICAgNzY4OiB7XHJcbiAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICB9LFxyXG4gIH1cclxufSkiLCIvLyBNZWRpYSA5OTIgPT09PT0+XHJcbmlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDk5MnB4KVwiKS5tYXRjaGVzKSB7XHJcbiAgJCgnLnRlY2hub2xvZ3ktY2FyZCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQoXCIudGVjaG5vbG9neS1jYXJkXCIpLm5vdCgkKHRoaXMpLmNsb3Nlc3QoXCIudGVjaG5vbG9neS1jYXJkXCIpKS5yZW1vdmVDbGFzcyhcImpzLWFjdGl2ZVwiKTtcclxuICAgICQodGhpcykuY2xvc2VzdChcIi50ZWNobm9sb2d5LWNhcmRcIikuYWRkQ2xhc3MoXCJqcy1hY3RpdmVcIik7XHJcbiAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnanMtYWN0aXZlJykpIHtcclxuICAgICAgJCgnLnRlY2hub2xvZ3ktY2FyZF9fYm9keScpLm5vdCgkKHRoaXMpLmZpbmQoJy50ZWNobm9sb2d5LWNhcmRfX2JvZHknKSkuc2xpZGVVcCgzMDApO1xyXG4gICAgICAkKHRoaXMpLmZpbmQoJy50ZWNobm9sb2d5LWNhcmRfX2JvZHknKS5zbGlkZURvd24oMzAwKTtcclxuICAgIH1cclxuICB9KVxyXG59IGVsc2Uge1xyXG4gICQoJy50ZWNobm9sb2d5LWNhcmQnKS5yZW1vdmVDbGFzcygnanMtYWN0aXZlJylcclxuICAkKCcudGVjaG5vbG9neS1jYXJkJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygnanMtYWN0aXZlJylcclxuICAgICQoJy50ZWNobm9sb2d5LWNhcmQnKS5ub3QoJCh0aGlzKSkucmVtb3ZlQ2xhc3MoJ2pzLWFjdGl2ZScpXHJcbiAgfSlcclxufSIsImNvbnN0IHNsaWRlclRlc3RpbW9uaWFscyA9IG5ldyBTd2lwZXIoJy50ZXN0aW1vbmlhbHMtc2xpZGVyJywge1xyXG4gIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICBsb29wOiB0cnVlLFxyXG4gIG5hdmlnYXRpb246IHtcclxuICAgIG5leHRFbDogXCIudGVzdGltb25pYWxzLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICBwcmV2RWw6IFwiLnRlc3RpbW9uaWFscy1idXR0b24tcHJldlwiLFxyXG4gIH0sXHJcbiAgcGFnaW5hdGlvbjoge1xyXG4gICAgZWw6IFwiLnRlc3RpbW9uaWFscy1wYWdpbmF0aW9uXCIsXHJcbiAgfSxcclxuICBicmVha3BvaW50czoge1xyXG4gICAgNzY4OiB7XHJcbiAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICB9LFxyXG4gICAgOTkyOiB7XHJcbiAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXHJcbiAgICB9XHJcbiAgfVxyXG59KSIsIi8vIE1lZGlhIDk5MiA9PT09PT5cclxuaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogOTkycHgpXCIpLm1hdGNoZXMpIHtcclxuICB3aW5kb3cuaG9tZXBhZ2VjaGVjayA9ICgpID0+IHtcclxuICAgIHZhciBjaGVjayA9IGZhbHNlO1xyXG4gICAgaWYoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL1wiIHx8IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9pbmRleC5odG1sXCIpe1xyXG4gICAgICBjaGVjaz10cnVlO1xyXG4gICAgICB9XHJcbiAgICByZXR1cm4gY2hlY2s7XHJcbiAgfVxyXG5cclxuICBpZih3aW5kb3cuaG9tZXBhZ2VjaGVjaygpKXtcclxuICAgIC8vIEhvcml6b250YWwgc2Nyb2xsIGluIFRyZWF0bWVudHMgPT09PT0+XHJcbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIpO1xyXG5cclxuICAgIGNvbnN0IHNlY3Rpb25zID0gZ3NhcC51dGlscy50b0FycmF5KFwiLnRyZWF0bWVudHMtd3JhcHBlclwiKTtcclxuICAgIGxldCBtYXhXaWR0aCA9IDA7XHJcblxyXG4gICAgY29uc3QgZ2V0TWF4V2lkdGggPSAoKSA9PiB7XHJcbiAgICAgIG1heFdpZHRoID0gMDtcclxuICAgICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG4gICAgICAgIG1heFdpZHRoICs9IHNlY3Rpb24ub2Zmc2V0V2lkdGg7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGdldE1heFdpZHRoKCk7XHJcbiAgICBTY3JvbGxUcmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJyZWZyZXNoSW5pdFwiLCBnZXRNYXhXaWR0aCk7XHJcblxyXG4gICAgbGV0IHRyaWdnZXJJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyZWF0bWVudHMnKTtcclxuXHJcbiAgICBnc2FwLnRvKHNlY3Rpb25zLCB7XHJcbiAgICAgIHg6ICgpID0+IGAtJHttYXhXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRofWAsXHJcbiAgICAgIGVhc2U6IFwibm9uZVwiLFxyXG4gICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgc3RhcnQ6IFwiLTEyMHB4IHRvcFwiLFxyXG4gICAgICAgIHRyaWdnZXI6IHRyaWdnZXJJdGVtLFxyXG4gICAgICAgIHBpbjogdHJ1ZSxcclxuICAgICAgICBzY3J1YjogdHJ1ZSxcclxuICAgICAgICBlbmQ6ICgpID0+IGArPSR7bWF4V2lkdGh9YCxcclxuICAgICAgICBpbnZhbGlkYXRlT25SZWZyZXNoOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHNlY3Rpb25zLmZvckVhY2goKHNjdCwgaSkgPT4ge1xyXG4gICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XHJcbiAgICAgICAgdHJpZ2dlcjogc2N0LFxyXG4gICAgICAgIHN0YXJ0OiAoKSA9PiAndG9wIHRvcC09JyArIChzY3Qub2Zmc2V0TGVmdCAtIHdpbmRvdy5pbm5lcldpZHRoLzIpICogKG1heFdpZHRoIC8gKG1heFdpZHRoIC0gd2luZG93LmlubmVyV2lkdGgpKSxcclxuICAgICAgICBlbmQ6ICgpID0+ICcrPScgKyBzY3Qub2Zmc2V0V2lkdGggKiAobWF4V2lkdGggLyAobWF4V2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkpLFxyXG4gICAgICAgIHRvZ2dsZUNsYXNzOiB7dGFyZ2V0czogc2N0LCBjbGFzc05hbWU6IFwiYWN0aXZlXCJ9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIG51bGxcclxuICB9XHJcblxyXG59IGVsc2Uge1xyXG4gIGNvbnN0IHNsaWRlclRyZWF0bWVudHMgPSBuZXcgU3dpcGVyKCcudHJlYXRtZW50cy1zbGlkZXInLCB7XHJcbiAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgbmV4dEVsOiBcIi50cmVhdG1lbnRzLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgIHByZXZFbDogXCIudHJlYXRtZW50cy1idXR0b24tcHJldlwiLFxyXG4gICAgfSxcclxuICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgZWw6IFwiLnRyZWF0bWVudHMtcGFnaW5hdGlvblwiLFxyXG4gICAgfSxcclxuICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgIDc2ODoge1xyXG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfSlcclxufSIsbnVsbCwiY29uc3Qgc2xpZGVyQ2FzZXMgPSBuZXcgU3dpcGVyKCcuY2FzZXMtc2xpZGVyJywge1xyXG4gIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICBuYXZpZ2F0aW9uOiB7XHJcbiAgICBuZXh0RWw6IFwiLmNhc2VzLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICBwcmV2RWw6IFwiLmNhc2VzLWJ1dHRvbi1wcmV2XCIsXHJcbiAgfSxcclxuICBwYWdpbmF0aW9uOiB7XHJcbiAgICBlbDogXCIuY2FzZXMtcGFnaW5hdGlvblwiLFxyXG4gIH0sXHJcbiAgYnJlYWtwb2ludHM6IHtcclxuICAgIDc2ODoge1xyXG4gICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgfSxcclxuICB9XHJcbn0pIiwiLy8gQ3VzdG9tIHNjcm9sbGJhciBpbiB0b290aCB0YWJsZSA9PT09PT5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcblx0T3ZlcmxheVNjcm9sbGJhcnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b290aFwiKSwge30pO1xyXG59KTtcclxuXHJcbi8vIElucHV0IEZpbGVzID09PT09PlxyXG5jb25zdCBkdCA9IG5ldyBEYXRhVHJhbnNmZXIoKTtcclxuXHJcbiQoXCIuZmlsZXMtdHJpZ2dlcl9faW5wdXRcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmZpbGVzLmxlbmd0aDsgaSsrKXtcclxuXHRcdGxldCBmaWxlc1dyYXBwZXIgPSAkKCc8ZGl2Lz4nLCB7Y2xhc3M6ICdmaWxlc19fd3JhcHBlcid9KTtcclxuICAgIGxldCBmaWxlc0l0ZW0gPSAkKCc8ZGl2Lz4nLCB7Y2xhc3M6ICdmaWxlcy1pdGVtJ30pLFxyXG5cdFx0XHRmaWxlTmFtZSA9ICQoJzxzcGFuLz4nLCB7Y2xhc3M6ICdmaWxlcy1pdGVtX19uYW1lJywgdGV4dDogdGhpcy5maWxlcy5pdGVtKGkpLm5hbWV9KTtcclxuXHRcdGZpbGVzSXRlbS5hcHBlbmQoJzxpIGNsYXNzPVwiaWNvbi1maWxlXCI+PC9pPicpXHJcblx0XHRcdC5hcHBlbmQoZmlsZU5hbWUpXHJcbiAgICAgIC5hcHBlbmQoJzxpIGNsYXNzPVwiZmlsZXMtaXRlbV9fcmVtb3ZlIGljb24tdHJhc2gtY2FuXCI+PC9pPicpO1xyXG4gICAgZmlsZXNXcmFwcGVyLmFwcGVuZChmaWxlc0l0ZW0pXHJcblx0XHQkKFwiLmZpbGVzX190YWJsZVwiKS5hcHBlbmQoZmlsZXNXcmFwcGVyKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xyXG4gICAgJCgnLmZpbGVzJykuY3NzKCdtYXJnaW4tYm90dG9tJywgJzQ4cHgnKVxyXG5cdH07XHJcblx0Zm9yIChsZXQgZmlsZSBvZiB0aGlzLmZpbGVzKSB7XHJcblx0XHRkdC5pdGVtcy5hZGQoZmlsZSk7XHJcblx0fVxyXG5cdHRoaXMuZmlsZXMgPSBkdC5maWxlcztcclxuXHJcblx0JCgnLmZpbGVzLWl0ZW1fX3JlbW92ZScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblx0XHRsZXQgbmFtZSA9ICQodGhpcykubmV4dCgnLmZpbGVzLWl0ZW1fX25hbWUnKS50ZXh0KCk7XHJcblx0XHQkKHRoaXMpLnBhcmVudHMoJy5maWxlc19fd3JhcHBlcicpLnJlbW92ZSgpO1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGR0Lml0ZW1zLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0aWYobmFtZSA9PT0gZHQuaXRlbXNbaV0uZ2V0QXNGaWxlKCkubmFtZSl7XHJcblx0XHRcdFx0ZHQuaXRlbXMucmVtb3ZlKGkpO1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmaWxlcy10cmlnZ2VyX19pbnB1dCcpLmZpbGVzID0gZHQuZmlsZXM7XHJcblx0fSk7XHJcbn0pOyIsbnVsbCxudWxsLCJjb25zdCBzbGlkZXJTb2NpYWxzID0gbmV3IFN3aXBlcignLnNvY2lhbHNfX3NsaWRlcicsIHtcclxuICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gIHNwYWNlQmV0d2VlbjogMzAsXHJcbiAgbmF2aWdhdGlvbjoge1xyXG4gICAgbmV4dEVsOiBcIi5zb2NpYWxzLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICBwcmV2RWw6IFwiLnNvY2lhbHMtYnV0dG9uLXByZXZcIixcclxuICB9LFxyXG4gIHBhZ2luYXRpb246IHtcclxuICAgIGVsOiBcIi5zb2NpYWxzLXBhZ2luYXRpb25cIixcclxuICB9LFxyXG4gIGJyZWFrcG9pbnRzOiB7XHJcbiAgICA3Njg6IHtcclxuICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgIH0sXHJcbiAgfVxyXG59KSJdfQ==