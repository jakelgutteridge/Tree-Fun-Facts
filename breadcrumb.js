const breadcrumb = document.getElementById('breadcrumb');

function generateBreadcrumb() {
    const url = window.location.pathname;
    const segments = url.split('/').filter(segment => segment !== '');

    let breadcrumbHTML = '<a href="/">Home</a>';
    let path = '/';

    const promises = segments.map(async (segment, index) => {
        path += segment + '/';
        const title = await getTitleFromMeta(path);
        breadcrumbHTML += ` &gt; <a href="${path}"${index === segments.length - 1 ? ' class="current"' : ''}>${title}</a>`;
    });

    Promise.all(promises)
        .then(() => {
            breadcrumb.innerHTML = breadcrumbHTML;
        })
        .catch(error => {
            console.error(error);
        });
}

async function getTitleFromMeta(path) {
    const response = await fetch(path + 'index.html');
    if (response.ok) {
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const titleElement = doc.querySelector('title');
        if (titleElement) {
            return titleElement.textContent;
        }
    }

    return 'Untitled';
}

window.onload = generateBreadcrumb;
