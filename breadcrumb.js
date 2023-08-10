const breadcrumb = document.getElementById('breadcrumb');

function generateBreadcrumb() {
    const url = window.location.pathname;
    const segments = url.split('/').filter(segment => segment !== '');

    let breadcrumbHTML = '<a href="/">Home</a>';
    let path = '/';

    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        path += segment + '/';

        getTitleFromMeta(path, segment)
            .then(title => {
                breadcrumbHTML += ` &gt; <a href="${path}">${title}</a>`;
                breadcrumb.innerHTML = breadcrumbHTML;
            })
            .catch(error => {
                console.error(error);
            });
    }
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
