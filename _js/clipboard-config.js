var clipboard = new Clipboard('.copy-button', {
    target: function(trigger) {
        return trigger.nextElementSibling;
    }
});

clipboard.on('success', function(e) {
    // console.info('Action:', e.action);
    // console.info('Text:', e.text);
    // console.info('Trigger:', e.trigger);
    e.clearSelection();
});