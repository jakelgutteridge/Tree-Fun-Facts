const breadcrumb = document.getElementById('breadcrumb');

function generateBreadcrumb() {
    const url = window.location.pathname;
    const segments = url.split('/').filter(segment => segment !== '');

    let breadcrumbHTML = '<a href="/">Home</a> &gt; ';
    let path = '/';

    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        path += segment + '/';

        const title = getTitleFromMeta(path);

        breadcrumbHTML += `<a href="${path}">${title}</a> &gt; `;
    }

    breadcrumbHTML = breadcrumbHTML.slice(0, -7);
    breadcrumb.innerHTML = breadcrumbHTML;
}

function getTitleFromMeta(path) {
    // Check if the page is a directory
    if (path.endsWith('/')) {
        const response = fetch(path + 'index.html');
        const text = response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        return doc.title;
    } else {
        return document.title;
    }
}

window.onload = generateBreadcrumb;
