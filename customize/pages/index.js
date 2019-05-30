define([
    'jquery',
    '/api/config',
    '/common/hyperscript.js',
    '/common/common-feedback.js',
    '/common/common-interface.js',
    '/common/textFit.min.js',
    '/customize/messages.js',
    '/customize/application_config.js',
    '/common/outer/local-store.js',
    '/customize/pages.js'
], function ($, Config, h, Feedback, UI, TextFit, Msg, AppConfig, LocalStore, Pages) {
    var urlArgs = Config.requireConf.urlArgs;

    var isAvailableType = function (x) {
        if (!Array.isArray(AppConfig.availablePadTypes)) { return true; }
        return AppConfig.availablePadTypes.indexOf(x) !== -1;
    };

    var checkRegisteredType = function (x) {
        // Return true if we're registered or if the app is not registeredOnly
        if (LocalStore.isLoggedIn()) { return true; }
        if (!Array.isArray(AppConfig.registeredOnlyTypes)) { return true; }
        return AppConfig.registeredOnlyTypes.indexOf(x) === -1;
    };

    return function () {
        var icons = [
            [ 'pad', Msg.type.pad],
            [ 'code', Msg.type.code],
            [ 'slide', Msg.type.slide],
            [ 'poll', Msg.type.poll],
            [ 'kanban', Msg.type.kanban],
            [ 'whiteboard', Msg.type.whiteboard],
            [ 'oodoc', Msg.type.oodoc],
            [ 'sheet', Msg.type.sheet],
            [ 'ooslide', Msg.type.ooslide],
            [ 'drive', Msg.type.drive]
        ].filter(function (x) {
            return isAvailableType(x[0]);
        })
            .map(function (x) {
                var s = 'div.bs-callout.cp-callout-' + x[0];
                var isEnabled = checkRegisteredType(x[0]);
                //if (i > 2) { s += '.cp-more.cp-hidden'; }
                var icon = AppConfig.applicationsIcon[x[0]];
                var font = icon.indexOf('cptools') === 0 ? 'cptools' : 'fa';
                var href = '/'+ x[0] +'/';
                var attr = isEnabled ? { href: href } : {
                    onclick: function () {
                        sessionStorage.redirectTo = href;
                        window.location.href = '/login/';
                    }
                };
                if (!isEnabled) {
                    s += '.cp-app-disabled';
                    attr.title = Msg.mustLogin;
                }
                return h('a', [
                    attr,
                    h(s, [
                        h('i.' + font + '.' + icon),
                        h('div.pad-button-text', {
                            style: 'width:120px;height:30px;'
                        }, [ x[1] ])
                    ])
                ]);
            });

        icons.forEach(function (a) {
            setTimeout(function () {
                TextFit($(a).find('.pad-button-text')[0], {minFontSize: 13, maxFontSize: 18});
            });
        });
        UI.addTooltips();


        var blocks = "";
        return [
            h('div#cp-main', [
                Pages.infopageTopbar(),
                h('div.container.cp-container', [
                    h('div.row', [
                        h('div.cp-title.col-12.col-sm-6', [
                            h('img', { src: '/customize/cryptpad-new-logo-colors-logoonly.png?' + urlArgs }),
                            h('h1', 'Piratenpartei'),
                            h('p', Msg.main_catch_phrase)
                        ]),
                        h('div.col-12.col-sm-6.cp-app-grid', [
                            icons,
                            //more
                        ])
                    ]),
                    /*h('div.row', [
                        h('div.cp-crowdfunding', [
                            crowdFunding
                        ])
                    ])*/
                ]),
            ]),
            Pages.infopageFooter(),
        ];
    };
});