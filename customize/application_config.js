/*
 * You can override the configurable values from this file.
 * The recommended method is to make a copy of this file (/customize.dist/application_config.js)
   in a 'customize' directory (/customize/application_config.js).
 * If you want to check all the configurable values, you can open the internal configuration file
   but you should not change it directly (/common/application_config_internal.js
*/
define(['/common/application_config_internal.js'], function (AppConfig) {
    config = AppConfig;
    config.displayCreationScreen = true;
    config.disableAnonymousStore = true;
    config.disableUserlistNotifications = true;
    config.disableCrowdfundingMessages = true;
    config.hideLoadingScreenTips = true;
    config.availablePadTypes = ['drive', 'code', 'pad', 'slide', 'file', 'todo', 'oodoc', 'sheet', 'teams', 'contacts'];
    config.registeredOnlyTypes = ['teams',];
    config.availableLanguages = ['de', 'en'];
    config.surveyURL = "https://survey.cryptpad.fr/index.php/963384?lang=de";
    return AppConfig;
});
