var edit_mode = false;
var marked = {};
var $node_info = null;
var $EDITABLE = null;

function toggleElement(e) {
    e.preventDefault();
    // IMPORTANT! Prevents bubbling up and subsequent deletions.
    e.stopImmediatePropagation();
    if(edit_mode) {
        // Toggle only - which will determine what to do next.
        $(this).toggleClass('svsn-marked');
        var id = getUniqueId($(this));
        // If the toggle sets it as marked, we know it's valid to remove,
        // otherwise the user may want to "undelete" it, which means
        // deleting it from our marked list.
        if($(this).hasClass('marked')) {
            delete marked[id];
        } else {
            marked[id] = true;
        }
        console.log('Adding new element to `marked`');
        console.table ? console.table(marked) : console.log(marked);
    }
}

function viewElementDetails(e) {
    $(this).css({
        'z-index': 999999,
        'position': 'relative'
    });
    var msg = 'Classes: [' + $(this).attr('class') + '] IDs: [' + $(this).attr('id') + ']';
    console.log(msg);
    $node_info.text(msg);
}

function addPageEvents(page) {
    var evs = {
        'hover': viewElementDetails,
        'click': toggleElement
    };
    // Update reference
    node_info = $('#node-info');
    // We only deal with classes/ids, since it's a bit impossible to decide
    // which other elements should be removed, and how to save it.
    // Maybe using node position, etc.. to determine a "unique" id, but
    // for now that's just overkill.
    $EDITABLE = page.find('[id], [class]');
    $EDITABLE.addClass('editable-svsn').on(evs);
}

function getUniqueId(el) {
    // Unique(ish) ID. Used for maps and/or saving as
    // JSON string for later retrieval.

    // TODO: fix collision possibilities by using the
    // node depth/position as an identifier.
    return $(el).attr('id') + $(el).attr('class');
}

function focusPanel() {
    // Set position to viewport
    $('#svsn-toolbar').css({
        top: $(window).scrollTop() + 100
    });
}

function setupPanel() {
    // All content has been loaded.
    var $template = null;
    var $indicator = $('#edit-mode-indicator');
    var $panel = $('#svsn-toolbar');
    $(window).on('scroll', function(e){
        focusPanel();
    });
    $panel.on('click', '#completed', function(e){
        e.preventDefault();
        $(this).toggleClass('svsn-active-btn');
        console.log('Current items to remove:');
        console.log(marked);
        // TODO: send request to popup to save
    });
    $panel.on('click', '#toggle', function(e){
        e.preventDefault();
        edit_mode = !edit_mode;
        $(this).toggleClass('svsn-active-btn');
        $('body').toggleClass('svsn-editing');
        $indicator.toggleClass('svsn-editing');
    });
    $panel.draggable({
        handle: '.panel-heading',
        opacity: 0.5,
        axis: 'x'
    });

    addStyle('vendor/jquery-ui.min.css');
    addStyle('vendor/bootstrap.min.css');
    addStyle('vendor/animate.css');
    addStyle('panel.css');
    addStyle('panel.dom.css');

    $('body').attr('data-svsn-loaded', true);
}

function loadPanel() {
    // Check if already loaded
    if($('body').data('svsn-loaded') === true) {
        focusPanel();
        return;
    }
    $('body').wrapInner('<div id="svsn-page"></div>');
    $('body').prepend('<div id="svsn-container"></div>');
    var $doc = $('#svsn-page');
    var $socket = $('#svsn-container');
    $socket.load(chrome.extension.getURL('panel.html'), function(){
        focusPanel();
        setupPanel();
        addPageEvents($doc);
    });
}

loadPanel();
