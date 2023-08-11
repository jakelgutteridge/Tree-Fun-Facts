        // Get the current URL path
        var path = window.location.pathname;
        
        // Split the path into segments
        var segments = path.split('/').filter(function(segment) {
            return segment !== "";
        });
        
        // Initialize the breadcrumb HTML
        var breadcrumbHtml = '<a href="/">Home</a> > ';
        
        // Loop through the segments to create the breadcrumb
        var currentPath = "/";
        for (var i = 0; i < segments.length; i++) {
            currentPath += segments[i] + '/';
            var title = segments[i];
            
            // Check if the segment is a directory and has an index.html
            if (i === segments.length - 1 && segments[i].endsWith('.html')) {
                title = '<strong>' + document.title + '</strong>';
            } else if (i === segments.length - 1 && segments[i].endsWith('/')) {
                title = '<strong>Index</strong>';
            }
            
            breadcrumbHtml += '<a href="' + currentPath + '">' + title + '</a>';
            
            if (i < segments.length - 1) {
                breadcrumbHtml += ' > ';
            }
        }
        
        // Display the breadcrumb
        document.getElementById('breadcrumb').innerHTML = breadcrumbHtml;
