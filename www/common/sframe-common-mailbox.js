define([
    'jquery',
    '/common/common-util.js',
    '/common/common-interface.js',
    '/common/common-ui-elements.js',
    '/common/notifications.js',
    '/common/hyperscript.js',
], function ($, Util, UI, UIElements, Notifications, h) {
    var Mailbox = {};

    Mailbox.create = function (Common) {
        var mailbox = Common.mailbox;
        var sframeChan = Common.getSframeChannel();

        var execCommand = function (cmd, data, cb) {
            sframeChan.query('Q_MAILBOX_COMMAND', {
                cmd: cmd,
                data: data
            }, function (err, obj) {
                if (err) { return void cb({error: err}); }
                cb(obj);
            });
        };

        var history = {};

        var removeFromHistory = function (type, hash) {
            if (!history[type]) { return; }
            history[type] = history[type].filter(function (obj) {
                return obj.hash !== hash;
            });
        };

        mailbox.sendTo = function (type, content, user) {
            execCommand('SENDTO', {
                type: type,
                msg: content,
                user: user
            }, function (err, obj) {
                if (err || (obj && obj.error)) { return void console.error(err || obj.error); }
            });
        };

        // UI

        var formatData = function (data) {
            return JSON.stringify(data.content.msg.content);
        };
        var createElement = function (data) {
            var notif;
            var dismiss = h('span.fa.fa-times');
            dismiss.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                mailbox.dismiss(data, function (err) {
                    if (err) { return void console.error(err); }
                    /*if (notif && notif.parentNode) {
                        try {
                            notif.parentNode.removeChild(notif);
                        } catch (e) { console.error(e); }
                    }*/
                });
            });
            notif = h('div.cp-notification', {
                'data-hash': data.content.hash
            }, [
                h('div.cp-notification-content', h('p', formatData(data))),
                h('div.cp-notification-dismiss', dismiss)
            ]);
            return notif;
        };


        var onViewedHandlers = [];
        var onMessageHandlers = [];

        onViewedHandlers.push(function (data) {
            var hash = data.hash.replace(/"/g, '\\\"');
            var $notif = $('.cp-notification[data-hash="'+hash+'"]');
            if ($notif.length) {
                $notif.remove();
            }
        });

        // Call the onMessage handlers
        var pushMessage = function (data, handler) {
            var todo = function (f) {
                try {
                    var el = createElement(data);
                    Notifications.add(Common, data, el);
                    f(data, el);
                } catch (e) {
                    console.error(e);
                }
            };
            if (typeof (handler) === "function") {
                return void todo(handler);
            }
            onMessageHandlers.forEach(todo);
        };

        var onViewed = function (data) {
            // data = { type: 'type', hash: 'hash' }
            onViewedHandlers.forEach(function (f) {
                try {
                    f(data);
                    Notifications.remove(Common, data);
                } catch (e) {
                    console.error(e);
                }
            });
            removeFromHistory(data.type, data.hash);
        };

        var onMessage = function (data) {
            // data = { type: 'type', content: {msg: 'msg', hash: 'hash'} }
            console.log(data.content);
            pushMessage(data);
            if (!history[data.type]) { history[data.type] = []; }
            history[data.type].push(data.content);
        };

        mailbox.dismiss = function (data, cb) {
            var dataObj = {
                hash: data.content.hash,
                type: data.type
            };
            execCommand('DISMISS', dataObj, function (obj) {
                if (obj && obj.error) { return void cb(obj.error); }
                onViewed(dataObj);
                cb();
            });
        };


        // Get all existing notifications + the new ones when they come
        mailbox.subscribe = function (cfg) {
            if (typeof(cfg.onViewed) === "function") {
                onViewedHandlers.push(cfg.onViewed);
            }
            if (typeof(cfg.onMessage) === "function") {
                onMessageHandlers.push(cfg.onMessage);
            }
            Object.keys(history).forEach(function (type) {
                history[type].forEach(function (data) {
                    pushMessage({
                        type: type,
                        content: data
                    }, cfg.onMessage);
                });
            });
        };


        // CHANNEL WITH WORKER

        sframeChan.on('EV_MAILBOX_EVENT', function (obj) {
            // obj = { ev: 'type', data: obj }
            var ev = obj.ev;
            var data = obj.data;
            if (ev === 'MESSAGE') {
                return void onMessage(data);
            }
            if (ev === 'VIEWED') {
                return void onViewed(data);
            }
        });

        execCommand('SUBSCRIBE', null, function () {
            //console.log('subscribed');
        });

        return mailbox;
    };

    return Mailbox;
});


