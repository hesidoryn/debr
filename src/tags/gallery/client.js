/*global $*/

$(function() {
  $(document).ready(function(){
    $('.vertical-carousel #indicators li').click(function(e){
      if(!e.target.className) {
        let slideToNumber = parseInt(e.target.attributes['data-slide-to'].value, 10);
        let currentActiveNumber = parseInt($('.vertical-carousel #indicators li.active')[0].attributes['data-slide-to'].value, 10);
        let top2bottom = (slideToNumber - currentActiveNumber) > 0 ? true : false;

        let slideTo = $(`.vertical-carousel #carousel-inner .item[data-slide=${slideToNumber}]`);
        let slideToImg = $(`.vertical-carousel #carousel-inner .item[data-slide=${slideToNumber}] img`);
        let currentActive = $('.vertical-carousel #carousel-inner .item.active');
        let currentActiveImg = $('.vertical-carousel #carousel-inner .item.active img');

        if(top2bottom) {
          currentActiveImg.animate({
            top: '100%'
          }, 500);
          currentActive.removeClass('active');
          slideToImg.css('top', '-100%');
          slideToImg.animate({
            top: '0%'
          }, 500);
          slideTo.addClass('active');
        } else {
          currentActiveImg.animate({
            top: '-100%'
          }, 500);
          currentActive.removeClass('active');
          slideToImg.css('top', '100%');
          slideToImg.animate({
            top: '0%'
          }, 500);
          slideTo.addClass('active');
        }
        $('.vertical-carousel #indicators li.active').removeClass('active');
        $(`.vertical-carousel #indicators li[data-slide-to=${slideToNumber}]`).addClass('active');
      } else {
        return;
      }
    });
  });
});
