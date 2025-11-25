document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('pre > code').forEach((codeBlock) => {
        const pre = codeBlock.parentNode;

        if (pre.tagName === 'PRE') {
            const button = document.createElement('button');
            button.className = 'copy-code-button';
            button.type = 'button';

            const svgIcon = `
                <svg xmlns="http://www.w3.org/2000/svg" class="copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>`;

            button.innerHTML = svgIcon;

            pre.appendChild(button);

            button.addEventListener('click', () => {
                const code = codeBlock.innerText;

                navigator.clipboard.writeText(code).then(() => {
                    button.innerText = 'Copied!';
                    button.classList.add('copied');

                    setTimeout(() => {
                        button.innerHTML = svgIcon;
                        button.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Error al copiar: ', err);
                    button.innerText = 'Error';
                });
            });
        }
    });
});
