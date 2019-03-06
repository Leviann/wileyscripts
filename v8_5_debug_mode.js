/**
 * Adds common tools onto the window
 */
void (function () {
    var excludeRegEx = /(nls|css|templates|jquery|json|Presenter)/;
    var modules = require
        && require.s
        && require.s.contexts
        && require.s.contexts._
        && require.s.contexts._.defined;
    Object.keys(modules).forEach(function (key) {
        if (excludeRegEx.test(key)) return;
        var split = key.split('/');
        var name;
        var namespace;
        if (split.length > 2 && !~key.indexOf('widgets-path')) {
            name = split.pop();
            namespace = split.pop();
            if (typeof window[namespace] !== 'object') window[namespace] = {};
            window[namespace][name] = modules[key];
        } else {
            name = split.pop();
            window[name] = modules[key];
        }
    });
    console.debug("DEBUG MODE ENABLED");
})();