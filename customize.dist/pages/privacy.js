define([
    '/common/hyperscript.js',
    '/customize/messages.js',
    '/customize/pages.js'
], function (h, Msg, Pages) {
    return function () {
        return h('div#cp-main', [
            Pages.infopageTopbar(),
            h('.container-fluid.cp-privacy-top', [
                h('div.container',[
                    h('center', h('h1', Msg.policy_title)),
                ]),
            ]),
            Pages.setHTML(h('div.container.cp-container.cp-privacy'), Msg.privacy_content),
            Pages.infopageFooter()
        ]);
    };
});

