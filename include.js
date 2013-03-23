/**
 * Include function for javascript on speed.
 *
 * v0.3 (c) 2006-2013 by Naden Badalgogtapeh <n.b@naden.de>
 *
 * http://www.naden.de
 *
 */

function include() {
	if(arguments.length == 0) {
		return;
	}
	
	var
		// cast function "arguments" to array
		arguments = Array.prototype.slice.call(arguments),
		// optinal callback
		callback = null,
		// trigger callback after "file" or "files"
		callback_trigger = 'file',
		// the files are stored here
		files;

	// at first detect, what type of call we are dealing with

	// single file
	// array of file(s)
	// array of files + callback per file
	if(arguments.length == 1) {
		files = arguments[0];
	}
	// files
	// single file + callback
	// files + single callback
	// array of files + single callback
	// array of files + callback per file
	// array of files + callback for some files
	else {
		// if the last argument is a function ...
		if(typeof arguments[arguments.length -1] == 'function') {
			// pop() it off
			callback = arguments.pop();
			// set trigger mode
			callback_trigger = 'files';
		}
		// unnest the "files" array
		files = arguments.length == 1 ? (typeof arguments[0] == 'object' ? arguments[0] : arguments) : arguments;
	}

	// force "files" to be an array
	if(typeof files !== 'object') {
		files = [files];
	}

	// trigger one callback per file
	if(callback_trigger == 'file') {
		// flag indicating if the last callback was "file" bound
		var perfile = false;

		while(files.length > 0) {
			var file = files.shift();

			// current file has it's own callback
			if(typeof file == 'object') {
				callback = file[1];
				file = file[0];
				perfile = true;
			}
			// just a regular file
			else if(perfile) {
				perfile = false;
				callback = null;
			}

			// inject the file
			_inject(file, callback);
		}
	}
	// trigger the callback after all files are injected
	else if(callback_trigger == 'files') {
		_include(files.shift(), callback);
		
		// handle our nested callbacks chain
		function _include(file, callback) {
			// inject the file + recursively callback
			_inject(file, function() {
				if(callback) {
					if(files.length > 0) {
						_include(files.shift(), callback);
					}
					// final file reached, now call the "callback" and we are done
					else {
						callback();
					}
				}
			});
		}
	}

	// injects a javascript file to the pages <head> section
	function _inject(file, callback) {
    
    var async = false, tokens = file.split('#');
    
    if(tokens.length == 2) {
      async = tokens[1] == 'async';
      file = tokens[0];
    }
        
    var s = document.createElement('script');
		s.type = 'text/javascript';
	  s.src = file + '?' + Math.random().toString().substring(2);
	  if(async) {
		  s.async = true;
		}

		if(callback) {
			var loaded = false;
			s.onload = s.onreadystatechange = function() {
				if(!loaded && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
					loaded = true;
					callback();
				}
			};
		}

		document.getElementsByTagName('head')[0].appendChild(s);
	}
}