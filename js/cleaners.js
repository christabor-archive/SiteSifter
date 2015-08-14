var NARROW_MODE = true;

function cleanWikipedia() {
    stripStyles(true, true, true);
    // Remove nav, but keep the search in a clean place at the top.
    var search_container = $('<div class="well"></div>');
    var search = $('#p-search');
    var toRemove = [
        '#mw-hidden-catlinks',
        '.mw-editsection-bracket',
        '#siteSub', '#mw-navigation', '#jump-to-nav', '#footer'
    ]
    search.addClass('well');
    search_container.append(search);
    search_container.find('form').addClass('form-inline');
    $('#firstHeading').append(search_container.html());
    $('#searchInput').unwrap();
    $(toRemove.join(' ')).remove();

    // Convert close button images to character
    $('[alt="close"]').replaceWith('&times;');

    if(!params.stripped) {
        $('img').not('.tex').addClass('img-thumbnail');
        $('.hatnote').addClass('well');

        // Images
        $('.thumbinner').addClass('pull-left');

        $('.tright').addClass('pull-right inline-pad');
        $('.lright').addClass('left-right inline-pad');

        $('.hlist').find('ul').addClass('list-inline');

        // Fix navboxes after stripping styles
        $('.vertical-navbox').css({
            'display': 'inline-block',
            'width': '30%'
        }).addClass('pull-right');
        $('#toc').addClass('pull-left well');

        // Boostrap site nocites
        $('#siteNotice').addClass('alert alert-info');
        // Add bs3 style labels.
        $('.mw-editsection a, .NavToggle').addClass('label label-default').css({
            'font-size': '10px',
            'text-transform': 'uppercase',
            'color': 'white',
            'margin': '1px 4px'
        });

        $('body').removeClass('narrow-mode');

        // Reset columns for custom wikipedia layout.
        $('.col-md-12').toggleClass('col-md-12 col-md-9');
        $('.row').prepend('<div class="col-md-3"></div>').attr('id', 'leftcol');
        $('.row').append('<div class="col-md-3"></div>').attr('id', 'rightcol');

        // Make three columns
        $('.infobox').clone(true).appendTo('#rightcol');
        // // Remove original
        $('.infobox').not('#rightcol').remove();
        useTheme('wikipedia');
    }
}

function cleanPage(params) {
    console.log('CleanPage params: ', params);
    // Don't clean the extension page.
    if($('#svsn-popup').length > 0) return;
    // Hide immediately
    $('body').hide();
    log('Cleaning page...' + window.location.href);
    if(window.location.hostname.split('.')[1] === 'wikipedia') {
        log('Cleaning wikipedia!');
        cleanWikipedia(params);
    }
    $('div').unwrap();

    // stripCSSBGs();
    stripSocial();
    removeBranding();
    cleanBasic();
    stripStyles(true, true, true);

    var themes = {
        'light': 'themes/theme.light.css',
        'dark': 'themes/theme.dark.css'
    };

    if(!params.stripped) {
        addBasicGlobalStyles();
        bootstrapify({
            nav: true,
            wrap: true,
            width_mode: 'medium', // "CLASS-mode" - css class to override wrapper
            style_tables: true,
            style_forms: true,
            style_images: true,
            style_container: true,
            table_classes: 'table table-striped table-bordered table-hover',
        });

        fixWidthHeight();
        addStyle('themes/default.css');
        addStyle('themes/theme.basic.css');
        if(params.theme == 'dark') {
            addStyle(themes.dark);
            $('.navbar-nav').addClass('navbar-inverse');
        } else if(params.theme == 'light') {
            addStyle(themes.light);
        }
        defaultFontStyles();
    }
    $('body').show();
}

function defaultFontStyles() {
    addGoogleFont($('head'), "family=Source+Code+Pro:400,200,300,500,600,700,900");
    addGoogleFont($('head'), "family=Anaheim");
    $('body').css({
        'font-family': "'Anaheim', sans-serif",
        'font-size': '20px'
    })
    .attr('id', 'svsn-customized');
    $('h1, h2, h3, h4, h5, h6, bold, strong').css('font-weight', 'bold');
}
