define([
    '/common/hyperscript.js',
    '/customize/messages.js',
    '/customize/pages.js'
], function (h, Msg, Pages) {
    return function () {
        return h('div#cp-main', [
            Pages.infopageTopbar(),
            Pages.setHTML(h('div.container.cp-container'), Msg.imprint_content),
            Pages.infopageFooter()
        ]);
    };
});

