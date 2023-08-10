const breadcrumb = document.getElementById('breadcrumb');

function generateBreadcrumb() {
    const url = window.location.pathname;
    const segments = url.split('/').filter(segment => segment !== '');

    let breadcrumbHTML = '<a href="/">Home</a>';

    let path = '/';
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        path += segment + '/';

        breadcrumbHTML += getTitleFromMeta(path, segment, i === segments.length - 1);
    }

    breadcrumb.innerHTML = breadcrumbHTML;
}

async function getTitleFromMeta(path, segment, isLastSegment) {
    const response = await fetch(path + 'index.html');
    if (response.ok) {
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const titleElement = doc.querySelector('title');
        if (titleElement) {
            return ` &gt; <a href="${path}"${isLastSegment ? ' class="current"' : ''}>${titleElement.textContent}</a>`;
        }
    }

    return ` &gt; <a href="${path}"${isLastSegment ? ' class="current"' : ''}>${segment}</a>`;
}

window.onload = generateBreadcrumb;
