var LintRoller = require('./node_modules/lintroller/');

var config = {
        verbose: false,
        stopOnFirstError: false,

        //recursively include JS files in these folders
        filepaths: [
            '../../client/javascripts/',
            '../../server/'
        ],

        //but ignore anything in these folders
        exclusions: [
            '../../server/node_modules/',
            '../../client/javascripts/lib/'
        ],

        linters: [
            {
                'type': 'jslint',
                'options': {
                    /**
                     * @see http://www.jslint.com/lint.html
                     */
                    'ass': false,     // true if assignment should be allowed outside of statement position.
                    'bitwise': false, // true if bitwise operators should be allowed. (mo
                    'browser': true,  // true if the standard browser globals should be predefined. (more)
                    'closure': false, // true if Google Closure annotations should be allowed.
                    'couch': true,    // true if Couch DB globals should be predefined.
                    'continue': false,// true if the continue statement should be allowed.
                    'debug': false,   // true if debugger statements should be allowed. Set this option to false before going into production.
                    'devel': false,   // true if browser globals that are useful in development should be predefined.
                    'eqeq': false,    // true if the == and != operators should be tolerated.
                    'evil': false,    // true if eval should be allowed
                    'forin': false,   // true if unfiltered for in statements should be allowed.
                    'indent': 4,      // The number of spaces used for indentation (default is 4).
                    'maxlen': 99999,  // The maximum number of characters in a line.
                    'newcap': false,  // true if Initial Caps with constructor functions is optional. (more)
                    'node': true,     // true if Node.js globals should be predefined. (more)
                    'nomen': true,    // true if names should not be checked for initial or trailing underbars.
                    'plusplus': true, // true if ++ and -- should be allowed. (more)
                    'regexp': true,   // true if . and [^...] should be allowed in RegExp literals. They match more material than might be expected, allowing attackers to confuse applications. These forms should not be used when validating in secure applications.
                    'sloppy': true,  // true if strict whitespace rules should be ignored.
                    'stupid': true,   // true if blocking (-Sync) methods can be used.
                    'sub': false,     // true if subscript notation may be used for expressions better expressed in dot notation.
                    'todo': true,     // true if comments starting with TODO should be allowed.
                    'vars': false,    // true if multiple var statement per function should be allowed.
                    'unparam': true,  // true if warnings should not be given for unused parameters.
                    'white': true    // true if strict whitespace rules should be ignored.
                }
            },
            {
                type: 'jshint',
                /**
                 * The options below are (should be) the same as .jshintrc in this directory
                 */
                options: {
                    // --------------------------------------------------------------------
                    // JSHint Configuration, Strict Edition
                    // --------------------------------------------------------------------
                    //
                    // This is a options template for [JSHint][1], using [JSHint example][2]
                    // and [Ory Band's example][3] as basis and setting config values to
                    // be most strict:
                    //
                    // * set all enforcing options to true
                    // * set all relaxing options to false
                    // * set all environment options to false, except the browser value
                    // * set all JSLint legacy options to false
                    //
                    // [1]: http://www.jshint.com/
                    // [2]: https://github.com/jshint/node-jshint/blob/master/example/config.json
                    // [3]: https://github.com/oryband/dotfiles/blob/master/jshintrc
                    //
                    // @author http://michael.haschke.biz/
                    // @license http://unlicense.org/

                    // == Enforcing Options ===============================================
                    //
                    // These options tell JSHint to be more strict towards your code. Use
                    // them if you want to allow only a safe subset of JavaScript, very
                    // useful when your codebase is shared with a big number of developers
                    // with different skill levels.

                    "bitwise": true,     // Prohibit bitwise operators (&, |, ^, etc.).
                    "curly": true,     // Require {} for every new block or scope.
                    "eqeqeq": true,     // Require triple equals i.e. `===`.
                    "forin": false,     // Tolerate `for in` loops without `hasOwnPrototype`.
                    "immed": true,     // Require immediate invocations to be wrapped in parens e.g. `( function(){}() );`
                    "latedef": false,     // Prohibit variable use before definition.
                    "newcap": true,     // Require capitalization of all constructor functions e.g. `new F()`.
                    "noarg": true,     // Prohibit use of `arguments.caller` and `arguments.callee`.
                    "noempty": true,     // Prohibit use of empty blocks.
                    "nonew": true,     // Prohibit use of constructors for side-effects.
                    "plusplus": false,     // Prohibit use of `++` & `--`.
                    "regexp": true,     // Prohibit `.` and `[^...]` in regular expressions.
                    "undef": true,     // Require all non-global variables be declared before they are used.
                    "strict": false,     // Require `use strict` pragma in every file.
                    "trailing": true,     // Prohibit trailing whitespaces.

                    // == Relaxing Options ================================================
                    //
                    // These options allow you to suppress certain types of warnings. Use
                    // them only if you are absolutely positive that you know what you are
                    // doing.

                    "asi": false,    // Tolerate Automatic Semicolon Insertion (no semicolons).
                    "boss": false,    // Tolerate assignments inside if, for & while. Usually conditions & loops are for comparison, not assignments.
                    "debug": false,    // Allow debugger statements e.g. browser breakpoints.
                    "eqnull": false,    // Tolerate use of `== null`.
                    "es5": false,    // Allow EcmaScript 5 syntax.
                    "esnext": false,    // Allow ES.next specific features such as `const` and `let`.
                    "evil": false,    // Tolerate use of `eval`.
                    "expr": false,    // Tolerate `ExpressionStatement` as Programs.
                    "funcscope": false,    // Tolerate declarations of variables inside of control structures while accessing them later from the outside.
                    "globalstrict": false,    // Allow global "use strict" (also enables 'strict').
                    "iterator": false,    // Allow usage of __iterator__ property.
                    "lastsemic": false,    // Tolerat missing semicolons when the it is omitted for the last statement in a one-line block.
                    "laxbreak": false,    // Tolerate unsafe line breaks e.g. `return [\n] x` without semicolons.
                    "laxcomma": false,    // Suppress warnings about comma-first coding style.
                    "loopfunc": false,    // Allow functions to be defined within loops.
                    "multistr": false,    // Tolerate multi-line strings.
                    "onecase": false,    // Tolerate switches with just one case.
                    "proto": false,    // Tolerate __proto__ property. This property is deprecated.
                    "regexdash": false,    // Tolerate unescaped last dash i.e. `[-...]`.
                    "scripturl": false,    // Tolerate script-targeted URLs.
                    "smarttabs": false,    // Tolerate mixed tabs and spaces when the latter are used for alignmnent only.
                    "shadow": false,    // Allows re-define variables later in code e.g. `var x=1; x=2;`.
                    "sub": false,    // Tolerate all forms of subscript notation besides dot notation e.g. `dict['key']` instead of `dict.key`.
                    "supernew": false,    // Tolerate `new function () { ... };` and `new Object;`.
                    "validthis": false,    // Tolerate strict violations when the code is running in strict mode and you use this in a non-constructor function.

                    // == Environments ====================================================
                    //
                    // These options pre-define global variables that are exposed by
                    // popular JavaScript libraries and runtime environments—such as
                    // browser or node.js.

                    "browser": true,     // Standard browser globals e.g. `window`, `document`.
                    "couch": false,    // Enable globals exposed by CouchDB.
                    "devel": false,    // Allow development statements e.g. `console.log();`.
                    "dojo": false,    // Enable globals exposed by Dojo Toolkit.
                    "jquery": false,    // Enable globals exposed by jQuery JavaScript library.
                    "mootools": false,    // Enable globals exposed by MooTools JavaScript framework.
                    "node": false,    // Enable globals available when code is running inside of the NodeJS runtime environment.
                    "nonstandard": false,    // Define non-standard but widely adopted globals such as escape and unescape.
                    "prototypejs": false,    // Enable globals exposed by Prototype JavaScript framework.
                    "rhino": false,    // Enable globals available when your code is running inside of the Rhino runtime environment.
                    "wsh": false,    // Enable globals available when your code is running as a script for the Windows Script Host.

                    // == JSLint Legacy ===================================================
                    //
                    // These options are legacy from JSLint. Aside from bug fixes they will
                    // not be improved in any way and might be removed at any point.

                    "nomen": false,    // Prohibit use of initial or trailing underbars in names.
                    "onevar": false,    // Allow only one `var` statement per function.
                    "passfail": false,    // Stop on first error.
                    "white": false,    // Check against strict whitespace and indentation rules.

                    // == Undocumented Options ============================================
                    //
                    // While I've found these options in [example1][2] and [example2][3]
                    // they are not described in the [JSHint Options documentation][4].
                    //
                    // [4]: http://www.jshint.com/options/

                    "maxerr": 100,      // Maximum errors before stopping.
                    "predef": [         // Extra globals.
                        //"exampleVar",
                        //"anotherCoolGlobal",
                        //"iLoveDouglas"
                    ],
                    "indent": 4         // Specify indentation spacing
                }
            },
            {
                type: 'esprima'
            }
        ],

        stdoutErrors: true
    }
    ;

try {
    LintRoller.init(config);
}
catch (e) {
    console.log('\nAn error has been caught:\n\n');
    console.log(e);
    process.exit(1);
}