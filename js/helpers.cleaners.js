var DOM_ELEMENTS = [
    'body', 'html',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p', 'ul', 'li', 'ol', 'dl', 'dt', 'dd',
    'div', 'span', 'section', 'article',
    'nav', 'footer', 'header', 'table'
];

function _removeInline() {
    // Remove old deprecated attributes
    var depr_attrs = [
        'cellspacing', 'cellpadding', 'valign', 'hspace', 'vspace',
        'background', 'alink', 'vlink', 'link', 'style', 'bgcolor', 'text',
        'center', 'align', 'font-size', 'text-size'];
    $.each(depr_attrs, removeAttribute);
}

function fixWidthHeight() {
    // Fix width/height issues on certain elements
    removeAttributesFromTag('table', ['xwidth', 'height', 'xheight', 'xwidth']);
}

function stripStyles(clobber_styles, clobber_style_links, clobber_inline) {
    // Remove all linked and embedded styles BEFORE adding custom ones.
    var safeguarded = '[data-svsn]';
    if(clobber_styles) $('style, STYLE').not(safeguarded).remove();
    if(clobber_style_links) $('link').not(safeguarded).remove();
    if(clobber_inline) _removeInline();
    // Remove ALL classes, IDs
    $('*').removeAttr('class').removeAttr('id');
}

function stripCSSBGs() {
    $.each(DOM_ELEMENTS, function(k, el){
        $(el).css({
            'background-color': 'transparent',
            'background-image': 'none'
        });
    });
}

function bootstrapify(opts) {
    var table_types = {
        basic: 'table',
        involved: 'table table-striped',
        complex: 'table table-striped table-bordered',
    }

    function styleForms() {
        $('button, input[type="submit"]').addClass('btn btn-md btn-primary');
        $('input, select, textarea').addClass('form-control input-md');
        $('form').addClass('form form-inline');
    }

    function styleContainer() {
        // Add bootstrap container classes
        $('body').wrapInner('<div class="container-fluid"><div class="row"><div class="col-md-12"></div></div></div>');
        // Custom wrapper width
        if(opts.width_mode) {
            $('body').addClass(opts.width_mode + '-mode');
        }
    }

    function normalizeNav() {
        // Normalize to bootstrap nav, if possible.
        $('nav, header, footer, [role="navigation"]').find('ul')
        .addClass('nav navbar-nav navbar-default');
    }

    if(opts.nav) normalizeNav();
    if(opts.wrap) styleContainer();
    if(opts.style_forms) styleForms();
    if(opts.style_tables) $('table').addClass(opts.table_classes ? opts.table_classes : table_types.basic);
    if(opts.style_images) $('figcaption, img').addClass('img-thumbnail');

    log('Adding bootstrap...');
    addStyle('vendor/bootstrap.min.css');
}

function addFonts() {
    // Google fonts page.
    var gfonts = [
        '<link href="http://fonts.googleapis.com/css?family=',
        // 'Gentium+Basic:400,700,400italic,700italic',
        'Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic',
        'rel="stylesheet" type="text/css">'
    ].join(' ');
    $('head').append(gfonts);
}

function addBasicGlobalStyles() {
    if(NARROW_MODE) {
        $('body').addClass('narrow-mode');
    }
    addFonts();
}

function replaceDeprecated() {
    // Replace deprecated tags with modern style equivalents.
    // Relies on custom css file.
    $('center').replaceWith('<span class="centered"></span>');
}

function cleanBasic() {
    // Delete empty tags
    $('div:empty, p:empty, ol:empty, ul:empty, table:empty').remove();

    // Try to clean/remove elements that may be common enough to exist
    $('.related-links-container, .related-links, #comments, .bottom-share-module, .bottom-share').remove();

    // Remove old deprecated tags
    $('font').children().unwrap();

    // Remove empty html tags
    $('font:empty, div:empty, p:empty, li:empty, ol:empty').remove();

    // Remove some common ids
    $.each([
        '#footer', '#header', '#content', '#main-content', '#nav',
        '#navigation', '#masthead', '#ad', '#ads', '#google-ads',
        '#googleads'
    ], removeID);
}

function stripSocial() {
    // Remove potential social share/icons/images -- can be unpredictable
    var social = [
        '#share-text', '.share-text',
        '#pinterest', '.pinterest',
        '#facebook', '.facebook',
        '#twitter', '.twitter',
        '#instagram', '.instagram',
        '#sharethis', '.sharethis',
        '[title="pinterest"]'
    ];
    $.each(social, removeEl);
    // Remove third party social widgets
    $('.sumome-share-client-wrapper, #leadpages-form-wrapper').remove();
    $('[href^="mailto:?]').remove();
    // Usual social share links
    $('[href^="http://www.facebook.com/sharer.php"], [href^="https://plus.google.com/share"], [href^="http://twitter.com/share"]').remove();
    // Affiliates, lead gen, etc...
    $('[href^="https://my.leadpages.net"]').remove();
}

function removeBranding() {
    // Huge assumptions being made here, but cleans up a lot of stuff
    // nicely, most of the time (in experiments).
    $('#logo, [alt="logo"], .logo', '[src="*=logo.png"]').remove();
}

function addToggleEvents() {
    console.log('TODO! add events that trigger behavior that can be controlled' +
        'at any time and toggled on and off, ala the font zoom feature natively' +
        'built in the browser!');
}
