define([
    'jquery',
    '/api/config',
    '/common/hyperscript.js',
    '/customize/messages.js',
    '/customize/application_config.js',
    '/common/outer/local-store.js',
    '/customize/pages.js'
], function ($, Config, h, Msg, AppConfig, LocalStore, Pages) {
    var urlArgs = Config.requireConf.urlArgs;

    var isAvailableType = function (x) {
        if (!Array.isArray(AppConfig.availablePadTypes)) { return true; }
        return AppConfig.availablePadTypes.some(function (type) {
            return x.indexOf(type) > -1;
        });
    };

    return function () {
        var showingMore = false;

        var icons = [
                [ 'code', '/code/', Msg.main_codePad, 'code' ],
                [ 'slide', '/slide/', Msg.main_slidePad, 'slide' ],
                [ 'recent', '/drive/', LocalStore.isLoggedIn() ? Msg.main_yourCryptDrive : Msg.main_localPads, 'drive' ]
            ].filter(function (x) {
                return isAvailableType(x[1]);
            })
            .map(function (x, i) {
                var s = 'div.bs-callout.cp-callout-' + x[0];
                if (i > 2) { s += '.cp-more.cp-hidden'; }
                var icon = AppConfig.applicationsIcon[x[3]];
                var font = icon.indexOf('cptools') === 0 ? 'cptools' : 'fa';
                return h('a', [
                    { href: x[1] },
                    h(s, [
                        h('i.' + font + '.' + icon),
                        h('div.pad-button-text', [ h('h4', x[2]) ])
                    ])
                ]);
            });

        var more = icons.length < 4? undefined: h('div.bs-callout.cp-callout-more', [
                h('div.cp-callout-more-lessmsg.cp-hidden', [
                    "see less ",
                    h('i.fa.fa-caret-up')
                ]),
                h('div.cp-callout-more-moremsg', [
                    "see more ",
                    h('i.fa.fa-caret-down')
                ]),
                {
                    onclick: function () {
                        if (showingMore) {
                            $('.cp-more, .cp-callout-more-lessmsg').addClass('cp-hidden');
                            $('.cp-callout-more-moremsg').removeClass('cp-hidden');
                        } else {
                            $('.cp-more, .cp-callout-more-lessmsg').removeClass('cp-hidden');
                            $('.cp-callout-more-moremsg').addClass('cp-hidden');
                        }
                        showingMore = !showingMore;
                    }
                }
            ]);

        var _link = h('a', {
            href: "https://opencollective.com/cryptpad/contribute",
            target: '_blank',
            rel: 'noopener',
        });

        var crowdFunding = AppConfig.disableCrowdfundingMessages ? undefined : h('button', [
            Msg.crowdfunding_button
        ]);

        $(crowdFunding).click(function () {
            _link.click();
        });
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
                        h('div.col-12.col-sm-6', [
                            icons,
                            more
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
