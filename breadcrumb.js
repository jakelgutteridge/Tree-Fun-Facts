const breadcrumb = document.getElementById('breadcrumb');

function generateBreadcrumb() {
    const url = window.location.pathname;
    const segments = url.split('/').filter(segment => segment !== '');

    let breadcrumbHTML = '<a href="/">Home</a> &gt; ';
    let path = '/';

    segments.forEach(segment => {
        path += segment + '/';
        breadcrumbHTML += getTitleFromMeta(path, segment);
    });

    breadcrumb.innerHTML = breadcrumbHTML;
}

function getTitleFromMeta(path, segment) {
    if (segment.endsWith('.html')) {
        return ` &gt; <a href="${path}">${document.title}</a>`;
    } else {
        return ` &gt; <a href="${path}">${segment}</a>`;
    }
}

window.onload = generateBreadcrumb;
