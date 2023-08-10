const breadcrumb = document.getElementById('breadcrumb');

function generateBreadcrumb() {
    const url = window.location.pathname;
    const segments = url.split('/').filter(segment => segment !== '');

    let breadcrumbHTML = '<a href="/">Home</a>';
    let path = '/';

    (async () => {
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            path += segment + '/';

            const title = await getTitleFromMeta(path, segment);
            breadcrumbHTML += ` &gt; <a href="${path}">${title}</a>`;

            if (i === segments.length - 1) {
                breadcrumb.innerHTML = breadcrumbHTML;
            }
        }
    })();
}

async function getTitleFromMeta(path, segment) {
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

    return segment;
}

window.onload = generateBreadcrumb;
