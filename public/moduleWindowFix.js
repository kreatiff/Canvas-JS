const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            const iframe = document.querySelector('#resource_selection_iframe');
            if (iframe) {
                const parent = iframe.closest('.ui-dialog');
                if (parent) {
                    parent.classList.add('stackle_module');
                    // parent.setAttribute('style', '');  remove all inline styles from the parent element
                    observer.disconnect(); // stop observing after the element is found
                }
            }
        }
    }
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});
