/*
 * You can override the translation text using this file.
 * The recommended method is to make a copy of this file (/customize.dist/translations/messages.{LANG}.js)
   in a 'customize' directory (/customize/translations/messages.{LANG}.js).
 * If you want to check all the existing translation keys, you can open the internal language file
   but you should not change it directly (/common/translations/messages.{LANG}.js)
*/
define(['/common/translations/messages.de.js'], function (Messages) {
    // Replace the existing keys in your copied file here:
    // Messages.button_newpad = "New Rich Text Document";
    out = Messages
    out.type.code = 'Pad (Markdown/Code)';
    out.button_newcode = 'Neues Pad (Markdown/Code)';
    out.anonymousUsers = "anonyme Nutzer";
    out.anonymousUser = "anonyme Nutzer";
    out.users = "Nutzer";
    out.viewer = "Betrachter";
    out.viewers = "Betrachter";
    out.editor = "Bearbeiter";
    out.editors = "Bearbeiter";
    out.themeButtonTitle = "Wähle das Farbschema für Pad(Markdown/Code)- und Folieneditor";
    out.poll_removeUser = "Bist du sicher, dass du diesen Nutzer entfernen möchtest?";
    out.settings_cat_code = "Pad (Markdown/Code)";
    out.settings_codeIndentation = 'Einrückung für den Pad(Markdown/Code)-Editor (Leerzeichen)';
    out.main_code = 'Pad(Markdown/Code)-Editor';
    out.main_codePad = 'Pad (Markdown/Code)';
    out.features_f_pad_notes = "Pads (Markdown/Code) und (Termin-)Umfragen";
    out.features_f_storage_anon = "Dokumente werden nach 30 Tagen Inaktivität (kein Aufruf) gelöscht";
    out.features_f_storage_registered = "20MB für Dateiablage; Dokumente werden nach 30 Tagen Inaktivität (kein Aufruf) gelöscht";
    out.imprint = 'Impressum';

    delete out.faq.other;
    delete out.faq.usability.feature;

    return Messages;
});

