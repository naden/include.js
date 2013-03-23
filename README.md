include.js
===============================

Advanced include implementation for javascript files.

Add #async to any filename to enable asynchronous loading for that file.

__Include a single file__

    include('test1.js');

    include(['test1.js']);

__Include a single file with async loading__

    include('test1.js#async');

__Include a single file and execute a callback function after it's loaded__

    include('test1.js', function() {
     console.log('test1.js loaded');
    });

    include([
     [ 'test1.js', function() {
      console.log('test1.js loaded');
     }]
    ]);

__Include two files__

    include('test1.js', 'test2.js');

    include(['test1.js', 'test2.js']);

__Include two files and execute a callback function after they're loaded__

    include('test1.js', 'test2.js', function() {
     console.log('test1.js and test2.js are loaded');
    });

    include(['test1.js', 'test2.js'], function() {
     console.log('init');
    });

__Include two files and execute a callback function per file__

    include([
     ['test1.js', function() {
      console.log('init1');
     }],
     ['test2.js', function() {
      console.log('init2');
     }]
    ]);


*For a more detailed explanation have a look at this blogpost [Javascript include](http://www.naden.de/blog/javascript-include).*
