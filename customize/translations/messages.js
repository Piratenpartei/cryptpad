/*
 * You can override the translation text using this file.
 * The recommended method is to make a copy of this file (/customize.dist/translations/messages.{LANG}.js)
   in a 'customize' directory (/customize/translations/messages.{LANG}.js).
 * If you want to check all the existing translation keys, you can open the internal language file
   but you should not change it directly (/common/translations/messages.{LANG}.js)
*/
define(['/common/translations/messages.js'], function (Messages) {
    // Replace the existing keys in your copied file here:
    // Messages.button_newpad = "New Rich Text Document";
    out = Messages;
    // custom stuff for info pages
    // imprint
    out.imprint = 'Imprint';
    out.imprint_content = '<h1 id="imprint">Imprint</h1>';

    // privacy
    out.privacy_content = '<h1 id="privacy">Privacy</h1>';

    // tos
    out.tos_content = '<h1 id="tos">Terms of Service</h1>';
    return Messages;
});

