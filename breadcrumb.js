const breadcrumb = document.getElementById('breadcrumb');

function generateBreadcrumb() {
    const url = window.location.pathname;
    const segments = url.split('/').filter(segment => segment !== '');

    let breadcrumbHTML = '<a href="/">Home</a>';

    for (let i = 0; i < segments.length; i++) {
        breadcrumbHTML += getTitleFromMeta(segments[i], i === segments.length - 1);
    }

    breadcrumb.innerHTML = breadcrumbHTML;
}

function getTitleFromMeta(segment, isLastSegment) {
    if (segment.endsWith('.html')) {
        return ` &gt; <a href="${segment}"${isLastSegment ? ' class="current"' : ''}>${document.title}</a>`;
    } else {
        return ` &gt; <a href="${segment + '/index.html'}"${isLastSegment ? ' class="current"' : ''}>${segment}</a>`;
    }
}

window.onload = generateBreadcrumb;
