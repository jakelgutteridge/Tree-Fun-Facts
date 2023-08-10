const breadcrumb = document.getElementById('breadcrumb');

function generateBreadcrumb() {
    const url = window.location.pathname;
    const segments = url.split('/').filter(segment => segment !== '');

    let breadcrumbHTML = '<a href="/">Home</a>';
    let path = '/';

    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        path += segment + '/';

        breadcrumbHTML += ` &gt; <a href="${path}"${i === segments.length - 1 ? ' class="current"' : ''}>${document.title}</a>`;
        breadcrumb.innerHTML = breadcrumbHTML;
    }
}

window.onload = generateBreadcrumb;
