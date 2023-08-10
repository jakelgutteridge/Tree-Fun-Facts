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

async function getTitleFromMeta(segment, isLastSegment) {
    if (segment.endsWith('.html')) {
        return ` &gt; <a href="${segment}"${isLastSegment ? ' class="current"' : ''}>${document.title}</a>`;
    } else {
        const title = await getTitleFromIndex(segment);
        return ` &gt; <a href="${segment + '/index.html'}"${isLastSegment ? ' class="current"' : ''}>${title}</a>`;
    }
}

async function getTitleFromIndex(directory) {
    const response = await fetch(directory + '/index.html');
    const text = await response.text();
    const titleTagStart = text.indexOf('<title>');
    const titleTagEnd = text.indexOf('</title>', titleTagStart);
    const title = text.substring(titleTagStart + 7, titleTagEnd);
    return title;
}

window.onload = generateBreadcrumb;
