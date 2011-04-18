# Jquery Navigate

Navigate is a small jquery plugin which enables keyboard navigation on the dom elements of your choice with the keys of your choice.


## Documentation

### simple usage

Just call the navigate() function on any selector in jquery to enable navigation using the arrow keys by default


__Example__

        $('.menu-item').navigate();


### options

The plugin accepts several options,

* mouse (Boolean) - Whether to allow mouse interaction
* activeClass (String) - The css class that should be added to the currently selected item
* keys (Object) - An object mapping key names to keycodes, in the following example the keys are mapped to W,A,S,D instead of the default arrow keys
* onSelect - A function called when an element is selected either via mouse or keyboard
* onFocus - A function called when an element receives focus

__Example 1__

        $('.menu-item').navigate({
          mouse: true,
          activeClass: 'current'
        });


__Example 2__

        $('.menu-item').navigate({
          keys: {
            up: 87,
            down: 65,
            left: 83,
            right: 68,
            select: 13
          }
        });
        

__Example 3__

        $('.menu-item').navigate({
          onSelect: function(){
            // access to 'this'
            alert($(this).text() + ' selected!');
          },
          onFocus: function(){
            // access to 'this'
            alert($(this).text() + ' received focus');
          }
        });


### destroy

In the event that you need to remove the keyboard navigation you can do so cleanly by passing 'destroy' as the first argument to the plugin


__Example__

        $('.menu-item').navigate('destroy');


## Download

Releases are available for download from
[GitHub](http://github.com/tommoor/navigate-jquery-plugin/downloads).

__Development:__ [jquery.navigate.js](https://github.com/tommoor/navigate-jquery-plugin/raw/master/jquery.navigate.js)

__Production:__ [jquery.navigate.min.js](https://github.com/tommoor/navigate-jquery-plugin/raw/master/jquery.navigate.min.js)
