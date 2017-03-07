/*global $*/

$(function() {
  $(document).ready(function(){
    $('.carousel #indicators li').click(function(e){
      if(!e.target.className) {
        let slideToNumber = parseInt(e.target.attributes['data-slide-to'].value, 10);
        let currentActiveNumber = parseInt($('.carousel #indicators li.active')[0].attributes['data-slide-to'].value, 10);
        let right2left = (slideToNumber - currentActiveNumber) > 0 ? true : false;

        let slideTo = $(`.carousel #carousel-inner .item[data-slide=${slideToNumber}]`);
        let slideToDiv = $(`.carousel #carousel-inner .item[data-slide=${slideToNumber}] div`);
        let currentActive = $('.carousel #carousel-inner .item.active');
        let currentActiveDiv = $('.carousel #carousel-inner .item.active div');

        if(right2left) {
          currentActiveDiv.animate({
            right: '100%'
          }, 500);
          currentActive.removeClass('active');
          slideToDiv.css('right', '-100%');
          slideToDiv.animate({
            right: '0%'
          }, 500);
          slideTo.addClass('active');
        } else {
          currentActiveDiv.animate({
            right: '-100%'
          }, 500);
          currentActive.removeClass('active');
          slideToDiv.css('right', '100%');
          slideToDiv.animate({
            right: '0%'
          }, 500);
          slideTo.addClass('active');
        }
        $('.carousel #indicators li.active').removeClass('active');
        $(`.carousel #indicators li[data-slide-to=${slideToNumber}]`).addClass('active');
      } else {
        return;
      }
    });
  });
});
