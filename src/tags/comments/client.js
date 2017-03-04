/*global $*/

$(function() {
  $(document).ready(function(){
    $('.carousel #indicators li').click(function(e){
      if(!e.target.className) {
        let slideToNumber = parseInt(e.target.attributes['data-slide-to'].value, 10);
        let currentActiveNumber = parseInt($('.carousel #indicators li.active')[0].attributes['data-slide-to'].value, 10);
        let right2left = (slideToNumber - currentActiveNumber) > 0 ? true : false;

        let slideTo = $(`.carousel #carousel-inner .item[data-slide=${slideToNumber}]`);
        let slideToImg = $(`.carousel #carousel-inner .item[data-slide=${slideToNumber}] img`);
        let currentActive = $('.carousel #carousel-inner .item.active');
        let currentActiveImg = $('.carousel #carousel-inner .item.active img');

        if(right2left) {
          currentActiveImg.animate({
            right: '100%'
          }, 500);
          currentActive.removeClass('active');
          slideToImg.css('right', '-100%');
          slideToImg.animate({
            right: '0%'
          }, 500);
          slideTo.addClass('active');
        } else {
          currentActiveImg.animate({
            right: '-100%'
          }, 500);
          currentActive.removeClass('active');
          slideToImg.css('right', '100%');
          slideToImg.animate({
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
