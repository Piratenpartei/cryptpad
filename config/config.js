/*@flow*/
/*
    globals module
*/
var _domain = 'https://cryptpad.piratenpartei.de/';

// You can `kill -USR2` the node process and it will write out a heap dump.
// If your system doesn't support dumping, comment this out and install with
// `npm install --production`
// See: https://strongloop.github.io/strongloop.com/strongblog/how-to-heap-snapshots/

// to enable this feature, uncomment the line below:
// require('heapdump');


// we prepend a space because every usage expects it
// requiring admins to preserve it is unnecessarily confusing
var domain = ' ' + _domain;
module.exports = {

    // the address you want to bind to, :: means all ipv4 and ipv6 addresses
    // this may not work on all operating systems
    httpAddress: '::',

    // the port on which your httpd will listen

    /*  CryptPad can be configured to send customized HTTP Headers
     *  These settings may vary widely depending on your needs
     *  Examples are provided below
     */

    httpHeaders: {
        "X-XSS-Protection": "1; mode=block",
        "X-Content-Type-Options": "nosniff",
        "Access-Control-Allow-Origin": "*"
    },

    contentSecurity: [
        "default-src 'none'",
        "style-src 'unsafe-inline' 'self' " + domain,
        "script-src 'unsafe-inline' 'unsafe-eval' 'self'" + domain,
        "font-src 'self' data:" + domain,

        /*  child-src is used to restrict iframes to a set of allowed domains.
         *  connect-src is used to restrict what domains can connect to the websocket.
         *
         *  it is recommended that you configure these fields to match the
         *  domain which will serve your CryptPad instance.
         */
        "child-src blob: *",
        // IE/Edge
        "frame-src blob: *",

        "media-src * blob:",

        /*  this allows connections over secure or insecure websockets
            if you are deploying to production, you'll probably want to remove
            the ws://* directive, and change '*' to your domain
         */
        "connect-src 'self' ws: wss: blob:" + domain,

        // data: is used by codemirror
        "img-src 'self' data: blob:" + domain,

        // for accounts.cryptpad.fr authentication and pad2 cross-domain iframe sandbox
        "frame-ancestors *",
    ].join('; '),

    // CKEditor requires significantly more lax content security policy in order to function.
    padContentSecurity: [
        "default-src 'none'",
        "style-src 'unsafe-inline' 'self'" + domain,
        // Unsafe inline, unsafe-eval are needed for ckeditor :(
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'" + domain,
        "font-src 'self'" + domain,

        /*  See above under 'contentSecurity' as to how these values should be
         *  configured for best effect.
         */
        "child-src *",
        // IE/Edge
        "frame-src *",

        // see the comment above in the 'contentSecurity' section
         "connect-src 'self' ws: wss:" + domain,

        // (insecure remote) images are included by users of the wysiwyg who embed photos in their pads
        "img-src * blob:",
    ].join('; '),

    httpPort: 3000,

    // This is for allowing the cross-domain iframe to function when developing
    httpSafePort: 3001,

    // This is for deployment in production, CryptPad uses a separate origin (domain) to host the
    // cross-domain iframe. It can simply host the same content as CryptPad.
    // httpSafeOrigin: "https://some-other-domain.xyz",

    httpUnsafeOrigin: domain,

    /*  your server's websocket url is configurable
     *  (default: '/cryptpad_websocket')
     *
     *  websocketPath can be relative, of the form '/path/to/websocket'
     *  or absolute, specifying a particular URL
     *
     *  'wss://cryptpad.fr:3000/cryptpad_websocket'
     */
    websocketPath: '/cryptpad_websocket',

    /*  CryptPad can log activity to stdout
     *  This may be useful for debugging
     */
    logToStdout: false,

    /*  CryptPad supports verbose logging
     *  (false by default)
     */
    verbose: false,

    /*  Main pages
     *  add exceptions to the router so that we can access /privacy.html
     *  and other odd pages
     */
    mainPages: [
        'index',
        'terms',
        'what-is-cryptpad'
    ],

    /*  Limits, Donations, Subscriptions and Contact
     *
     *  By default, CryptPad limits every registered user to 50MB of storage. It also shows a
     *  subscribe button which allows them to upgrade to a paid account. We handle payment,
     *  and keep 50% of the proceeds to fund ongoing development.
     *
     *  You can:
     *  A: leave things as they are
     *  B: disable accounts but display a donate button
     *  C: hide any reference to paid accounts or donation
     *
     *  If you chose A thein there's nothing to do.
     *  If you chose B, set 'allowSubscriptions' to false.
     *  If you chose C, set 'removeDonateButton' to true
     */
    allowSubscriptions: false,
    removeDonateButton: true,
    noSubscriptionButton: true,

    /*  Sales coming from your server will be identified by your domain
     *
     *  If you are using CryptPad in a business context, please consider taking a support contract
     *  by contacting sales@cryptpad.fr
     */
    myDomain: _domain,

    /*
     *  If you are using CryptPad internally and you want to increase the per-user storage limit,
     *  change the following value.
     *
     *  Please note: This limit is what makes people subscribe and what pays for CryptPad
     *    development. Running a public instance that provides a "better deal" than cryptpad.fr
     *    is effectively using the project against itself.
     */
    defaultStorageLimit: 50 * 1024 * 1024,

    /*  CryptPad can be configured to remove inactive data which has not been pinned.
     *  Deletion of data is always risky and as an operator you have the choice to
     *  archive data instead of deleting it outright. Set this value to true if
     *  you want your server to archive files and false if you want to keep using
     *  the old behaviour of simply removing files.
     *
     *  WARNING: this is not implemented universally, so at the moment this will
     *  only apply to the removal of 'channels' due to inactivity.
     */
    retainData: true,

    /*  As described above, CryptPad offers the ability to archive some data
     *  instead of deleting it outright. This archived data still takes up space
     *  and so you'll probably still want to remove these files after a brief period.
     *  The intent with this feature is to provide a safety net in case of accidental
     *  deletion. Set this value to the number of days you'd like to retain
     *  archived data before it's removed permanently.
     *
     *  If 'retainData' is set to false, there will never be any archived data
     *  to remove.
     */
    archiveRetentionTime: 15,


    adminKeys: [
    "https://cryptpad.piratenpartei.de/user/#/1/promasu/2S+uYgBP-FflH9XhpZM+uTIAAe3NY593DELdvRypdzI=",
    "https://cryptpad.piratenpartei.de/user/#/1/derborys/MMY96qi7G1eJi3iyyM4uqGRnKZDkD27X1vPBe9-5b7Q=",
    "https://cryptpad.piratenpartei.de/user/#/1/loki/wUkBAtszF+nKsYHLwZMdoZRkJCf6+TVZoX1qz08fO3s=",
    "https://cryptpad.piratenpartei.de/user/#/1/janrei/kD61Do0kYuFUpPW+6sSOdvGgWDjHzkiseP0SfPM0k+k=",
    "https://cryptpad.piratenpartei.de/user/#/1/steffi/6x8uIP5e0C+heWyF9a8y8Up-fJpyN-Ww1zBUfAbnOhw="
    ],

    supportMailboxPublicKey: "7dIMBXO1J3Xby5glWMjoEE0h5byuS+m9z3/gmJ9FiA8=",

    /*
     *  CryptPad allows administrators to give custom limits to their friends.
     *  add an entry for each friend, identified by their user id,
     *  which can be found on the settings page. Include a 'limit' (number of bytes),
     *  a 'plan' (string), and a 'note' (string).
     *
     *  hint: 1GB is 1024 * 1024 * 1024 bytes
     */
    customLimits: {
        /*
        "https://my.awesome.website/user/#/1/cryptpad-user1/YZgXQxKR0Rcb6r6CmxHPdAGLVludrAF2lEnkbx1vVOo=": {
            limit: 20 * 1024 * 1024 * 1024,
            plan: 'insider',
            note: 'storage space donated by my.awesome.website'
        },
        "https://my.awesome.website/user/#/1/cryptpad-user2/GdflkgdlkjeworijfkldfsdflkjeEAsdlEnkbx1vVOo=": {
            limit: 10 * 1024 * 1024 * 1024,
            plan: 'insider',
            note: 'storage space donated by my.awesome.website'
        }
        */
        "https://cryptpad.piratenpartei.de/user/#/1/steffi/6x8uIP5e0C+heWyF9a8y8Up-fJpyN-Ww1zBUfAbnOhw=": {
            limit: 500 *  1024 * 1024,
            plan: 'assi',
            note: 'BuVo Assistenz'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/promasu/2S+uYgBP-FflH9XhpZM+uTIAAe3NY593DELdvRypdzI=": {
            limit: 500 * 1024 * 1024,
            plan: 'admin',
            note: 'Administrator'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/derborys/MMY96qi7G1eJi3iyyM4uqGRnKZDkD27X1vPBe9-5b7Q=": {
            limit: 500 * 1024 * 1024,
            plan: 'buvo',
            note: 'BuVo'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/loki/wUkBAtszF+nKsYHLwZMdoZRkJCf6+TVZoX1qz08fO3s=": {
            limit: 500 * 1024 * 1024,
            plan: 'admin',
            note: 'Administrator'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/frecklesfairy/rwxqluVJDgUzHcOxy7a1hsJZ6dt+6dRLmfByJuoDM9Y=": {
            limit: 500 * 1024 * 1024,
            plan: 'lavo',
            note: 'LaVo'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/septerra/04Rgovcx5N1xWwg5OUlogjED4pridneXEYzUU6c1P3g=": {
            limit: 500 * 1024 * 1024,
            plan: 'lavo',
            note: 'LaVo'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/pawel.borodan@piratenpartei.de/wzugfTtR504TeE-bxnXftsdsumikjs+kv2TtXQaYgFI=": {
            limit: 500 * 1024 * 1024,
            plan: 'lavo',
            note: 'LaVo'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/wuerfel/c2nrOF57bSkGeJuLXVXvtw8HfCxygXppO8nfaBWvTE8=": {
            limit: 500 * 1024 * 1024,
            plan: 'p9a',
            note: 'Leiter LGS'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/llarian/wnuzvluwd7WcrEX9e9ZyOHamtidjijthel3mwmMWAI0=": {
            limit: 500 * 1024 * 1024,
            plan: 'p9a',
            note: 'Mitarbeiter Bund'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/sandraleurs/w6d78O+Jx9U7DnYgyhGw85uL-rFNVgNigRX4kxkdmz8=": {
            limit: 200 * 1024 * 1024,
            plan: 'ag',
            note: 'AG-Arbeit'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/janrei/kD61Do0kYuFUpPW+6sSOdvGgWDjHzkiseP0SfPM0k+k=": {
            limit: 500 * 1024 * 1024,
            plan: 'lavo',
            note: 'LaVo'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/klischeepunk/cEMyDOBy3yfAurL0QFpjzR+uNqE4SrrkrA0jjeqvUnA=": {
            limit: 100 * 1024 * 1024,
            plan: 'krvo',
            note: 'KrVo'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/tyg/vU-+cD7xMsKDaq3+pyl09zydvaSDp-m6Y9s7+i1xyDE=": {
            limit: 500 * 1024 * 1024,
            plan: 'lavo',
            note: 'LaVo'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/alexanderebhart/rZjuUINuKsw4IhT2sEgPDNCVVw0zlIxWMRRQ-84YZRQ=": {
            limit: 500 * 1024 * 1024,
            plan: 'presse',
            note: 'Presse'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/lorycamo/bwv0QtrZrBdWfxm-peGM1aHmfki80NnHXO2tLAcW8l4=": {
            limit: 500 * 1024 * 1024,
            plan: 'presse',
            note: 'Presse'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/stoppegp/LAolDGYr5zSwnPrOQOeO1-SPKvOmH-lNp3BT8bqNiKk=": {
            limit: 500 * 1024 * 1024,
            plan: 'presse',
            note: 'Presse'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/annette/5hgc5EFU1ATuZMa0H8El-+HEY5ttV+7ikYujR83NpAI=": {
            limit: 500 * 1024 * 1024,
            plan: "lavo",
            note: 'LaVo'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/icke2aida/3hWnBdblGhLSTh9f4MfjFLlp2+KClpxwt4VqnFw9hP4=": {
            limit: 200 * 1024 * 1024,
            plan: 'bzba',
            note: 'BzBA'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/detlef netter/up5NBB+Sr4UUFOuWujYt3O3YwELwVS3ruQRSBOTghps=": {
            limit: 500 * 1024 * 1024,
            plan: 'buvo',
            note: 'BuVo'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/dogas/XG7mg2+ZcH+chwyhJxAwpgKcO4vfQiMCx-XQMGvJVC4=": {
            limit: 200 * 1024 * 1024,
            plan: 'lavo',
            note: 'LaVo'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/herb_foxley/zZjquETluWYYqhlH6Xb3f1ha-y7aiEA4lMWTwW8wQCs=": {
            limit: 200 * 1024 * 1024,
            plan: 'mandate',
            note: 'Mandatstraeger'
        },

        "https://cryptpad.piratenpartei.de/user/#/1/Kerstin/+QyzG267GW5xj6HuCq+PqnDMKRWXoMg6t30CjrWX7K4=": {
            limit: 100 * 1024 * 1024,
            plan: 'asked',
            note: 'Anfrage'
        }

    },

    /*  some features may require that the server be able to schedule tasks
        far into the future, such as:
            > "three months from now, this channel should expire"
        To disable these features, set 'enableTaskScheduling' to false
    */
    enableTaskScheduling: true,

    /*  if you would like the list of scheduled tasks to be stored in
        a custom location, change the path below:
    */
    taskPath: './tasks',

    /*  if you would like users' authenticated blocks to be stored in
        a custom location, change the path below:
    */
    blockPath: './block',

    archivePath: './archive',

    /*
     *  By default, CryptPad also contacts our accounts server once a day to check for changes in
     *  the people who have accounts. This check-in will also send the version of your CryptPad
     *  instance and your email so we can reach you if we are aware of a serious problem. We will
     *  never sell it or send you marketing mail. If you want to block this check-in and remain
     *  completely invisible, set this and allowSubscriptions both to false.
     */
    adminEmail: "support@it.piratenpartei.de",


    /*
        You have the option of specifying an alternative storage adaptor.
        These status of these alternatives are specified in their READMEs,
        which are available at the following URLs:

        mongodb: a noSQL database
            https://github.com/xwiki-labs/cryptpad-mongo-store
        amnesiadb: in memory storage
            https://github.com/xwiki-labs/cryptpad-amnesia-store
        leveldb: a simple, fast, key-value store
            https://github.com/xwiki-labs/cryptpad-level-store
        sql: an adaptor for a variety of sql databases via knexjs
            https://github.com/xwiki-labs/cryptpad-sql-store

        For the most up to date solution, use the default storage adaptor.
    */
    storage: './storage/file',

    /*
        CryptPad stores each document in an individual file on your hard drive.
        Specify a directory where files should be stored.
        It will be created automatically if it does not already exist.
    */
    filePath: './datastore/',

    /*  CryptPad allows logged in users to request that particular documents be
     *  stored by the server indefinitely. This is called 'pinning'.
     *  Pin requests are stored in a pin-store. The location of this store is
     *  defined here.
     */
    pinPath: './pins',

    /*  Pads that are not 'pinned' by any registered user can be set to expire
     *  after a configurable number of days of inactivity (default 90 days).
     *  The value can be changed or set to false to remove expiration.
     *  Expired pads can then be removed using a cron job calling the
     *  `delete-inactive.js` script with node
     */
    inactiveTime: 30, // days

    /*  CryptPad allows logged in users to upload encrypted files. Files/blobs
     *  are stored in a 'blob-store'. Set its location here.
     */
    blobPath: './blob',

    /*  CryptPad stores incomplete blobs in a 'staging' area until they are
     *  fully uploaded. Set its location here.
     */
    blobStagingPath: './blobstage',

    /*  CryptPad's file storage adaptor closes unused files after a configurable
     *  number of milliseconds (default 30000 (30 seconds))
     */
    channelExpirationMs: 30000,

    /*  CryptPad's file storage adaptor is limited by the number of open files.
     *  When the adaptor reaches openFileLimit, it will clean up older files
     */
    openFileLimit: 4096,

    /*  CryptPad's socket server can be extended to respond to RPC calls
     *  you can configure it to respond to custom RPC calls if you like.
     *  provide the path to your RPC module here, or `false` if you would
     *  like to disable the RPC interface completely
     */
    rpc: './rpc.js',

    /*  RPC errors are shown by default, but if you really don't care,
     *  you can suppress them
     */
    suppressRPCErrors: false,

    /*  Setting this value to anything other than true will cause file upload
     *  attempts to be rejected outright.
     */
    enableUploads: true,

    /*  If you have enabled file upload, you have the option of restricting it
     *  to a list of users identified by their public keys. If this value is set
     *  to true, your server will query a file (cryptpad/privileged.conf) when
     *  users connect via RPC. Only users whose public keys can be found within
     *  the file will be allowed to upload.
     *
     *  privileged.conf uses '#' for line comments, and splits keys by newline.
     *  This is a temporary measure until a better quota system is in place.
     *  registered users' public keys can be found on the settings page.
     */
    //restrictUploads: false,

    /*  Max Upload Size (bytes)
     *  this sets the maximum size of any one file uploaded to the server.
     *  anything larger than this size will be rejected
     */
    maxUploadSize: 20 * 1024 * 1024,

    /*  clients can use the /settings/ app to opt out of usage feedback
     *  which informs the server of things like how much each app is being
     *  used, and whether certain clientside features are supported by
     *  the client's browser. The intent is to provide feedback to the admin
     *  such that the service can be improved. Enable this with `true`
     *  and ignore feedback with `false` or by commenting the attribute
     */
    logFeedback: false,

    /*  If you wish to see which remote procedure calls clients request,
     *  set this to true
     */
    logRPC: true,

    /* it is recommended that you serve CryptPad over https
     * the filepaths below are used to configure your certificates
     */
    //privKeyAndCertFiles: [
    //  '/etc/apache2/ssl/my_secret.key',
    //  '/etc/apache2/ssl/my_public_cert.crt',
    //  '/etc/apache2/ssl/my_certificate_authorities_cert_chain.ca'
    //],

    /* You can get a repl for debugging the server if you want it.
     * to enable this, specify the debugReplName and then you can
     * connect to it with `nc -U /tmp/repl/<your name>.sock`
     * If you run multiple cryptpad servers, you need to use different
     * repl names.
     */
    //debugReplName: "cryptpad"
};
