/*
 * jQuery.navigate - Allow any group of dom elements to be navigated with the keyboard arrows
 * Tom Moor, http://tommoor.com
 * Copyright (c) 2011 Tom Moor
 * MIT Licensed
 * @version 1.0
 */

(function($){

  var handleKeyDown;
  var handleMouseOver;
  var navigate;
  var options;
  var $current;
  var $collection;
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
        
  var methods = {
    init : function(o){
    
      options = $.extend(defaults, o);
      $current = this.first().addClass(options.activeClass);
      $collection = this;

      handleKeyDown = function(e){
      
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
      };
      
      
      handleMouseOver = function(){
        $('.'+options.activeClass).removeClass(options.activeClass).trigger('blur');
        $current = $(this).addClass(options.activeClass).trigger('focus');
      };
      

      navigate = function(x, y) {
      
        var delta = x+y;
        var $closest = $current;
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
        
        // no more nodes in this direction
        if(options.wrap && $current === $closest) return;
        
        // trigger node as active
        $current.removeClass(options.activeClass);
        $current.trigger('blur');
        $closest.addClass(options.activeClass);
        $closest.trigger('focus');
        $current = $closest;
      }
      
      
      // bind key and mouse events if required
      $(document).bind('keydown', handleKeyDown);
      if(options.mouse) $collection.bind('mouseover', handleMouseOver);
 
      return this;
    },
    destroy : function(){
    
      // unbind all plugin event handlers
      $(document).unbind('keydown', handleKeyDown);
      $collection.unbind('mouseover', handleMouseOver);
      $collection.removeClass(options.activeClass);
      
      // recover memory
      options = $current = $collection = null;
      
      return this;
    }
  };


  $.fn.navigate = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.navigate' );
    }    
  
  };
})(jQuery);
