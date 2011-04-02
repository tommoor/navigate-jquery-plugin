/*
 * jQuery.navigate - Allow any group of dom elements to be navigated with the keyboard arrows
 * Tom Moor, http://tommoor.com
 * Released into the public domain
 * Date: 05 April 2011
 * @author Tom Moor
 * @version 1.0
 */

(function($){
 $.fn.navigate = function(options) {

  var defaults = {
   mouse: true,
   activeClass: 'active',
   keys: {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    select: 13
   }
  };
  var options = $.extend(defaults, options);
  var $current = this.first().addClass(options.activeClass);
  var $collection = this;

  $(document).keydown(function(event){
  
    if(!e){ var e = window.event; }
    
	  switch(e.keyCode){  
	    case options.keys.up:
	      navigate(0,-1);
	      break;
	    case options.keys.down:
	      navigate(0,1);
	      break;
	    case options.keys.left:
	      navigate(-1,0);
	      break;
	    case options.keys.right:
	      navigate(1,0);
	      break;
	    case options.keys.select:
	      $current.trigger('click');
	      break;
	  }
  });


  navigate = function(x,y) {
  
    var delta = x+y;
    var $closest = $collection.first();
    var $difference = 0;
    var a,b,d;

    $collection.each(function(){
      a = $(this); 

      // ignore the current node
      if(a === $current) return;
      if(x !== 0) d = parseInt(a.position().left - $current.position().left);
      if(y !== 0) d = parseInt(a.position().top - $current.position().top);
      
      // node not in the right direction, drop out
      if(!(d > 0 && delta > 0) && !(d < 0 && delta < 0)) return;
      
      // distance calc would normally require sqrt but can be left out as we are only comparing.
      b = Math.pow($current.position().left-a.position().left,2)+Math.pow($current.position().top-a.position().top,2);
      
      // closest node so far?
      if(b < $difference || $difference === 0){
        $closest = a; $difference = b;
      }      
    });
    
    $current.removeClass(options.activeClass);
    $current.trigger('blur');
    $closest.addClass(options.activeClass);
    $closest.trigger('focus');
    $current = $closest;
  }
  
  
  if(options.mouse){
    $collection.mouseover(function(){
      $('.'+options.activeClass).removeClass(options.activeClass).trigger('blur');
      $current = $(this).addClass(options.activeClass).trigger('focus');
    });
  }


  return this;
 };
})(jQuery);
