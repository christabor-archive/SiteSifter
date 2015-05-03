var SVSN_DEBUG = true;

function urlHasToken(token) {
    $.each(window.location.href.split('.'), function(k, piece){
        if(piece === token) return true;
    });
    return false;
}

function isTLD(tld) {
    var regex = new RegExp(tld);
    return regex.test(window.location.host);
}

function addScript(url) {
    var $sc = $('<script></script>');
    $sc.attr('src', chrome.extension.getURL('js/' + url));
    $('body').append($sc);
}

function injectStylesheet(shadow, url) {
    // Since the Shadow DOM spec doesn't support external links,
    // we have to inject it in as a <style> tag.
    $.get(chrome.extension.getURL('css/' + url), function(stylesheet){
        var $style = $('<style></style>');
        $style.html(stylesheet);
        shadow.prepend($style);
    });
}

function addStyle(url) {
    var $ss = $('<link rel="stylesheet" href="" />');
    $ss.attr('data-svsn', true);
    $ss.attr('href', chrome.extension.getURL('css/' + url));
    // Add to beginning so original site styles (if enabled) take precedence.
    $('head').append($ss);
}

function tagify(data, tag) {
    var html = '<' + tag + '>';
    $.each(data, function(k, v){
        html += '<span>' + k + ': ' +  v +'</span>';
    });
    html += '</' + tag + '>';
    return html;
}

function removeID(k, id) {
    $(id).attr('id', '');
}

function removeClass(k, klass) {
    $(klass).removeClass(klass);
}

function removeAttributeFromTag(tag, attr) {
    $(tag).attr(attr, '');
}

function removeAttributesFromTag(tag, attrs) {
    $.each(attrs, function(k, attr){
        removeAttributeFromTag(tag, attr);
    });
}

function removeAttribute(k, attr) {
    $('[' + attr + ']').attr(attr, '');
}

function removeEl(k, el) {
    if(SVSN_DEBUG) {
        log('Removing element', el);
    }
    $(el).remove();
}

function setupShadowDOM(shadow_selector, template_selector) {
    // If we need to use shadow DOM...
    // it doesn't support link/script, so it's kind of worthless here.
    var shadow   = document.querySelector(shadow_selector).createShadowRoot();
    var template = document.querySelector(template_selector);
    var clone    = document.importNode(template.content, true);
    shadow.appendChild(clone);
}

function log() {
    // Debug func
    console.log('-------------------------------');
    $.map(arguments, function(k, v){console.log('[KEY] ' + k + ' [VAL] ' + v)});
}

function useTheme(theme) {
    addStyle('themes/theme.' + theme + '.css')
}
