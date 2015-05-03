function loadSitesList() {
    // TODO
    var pages = chrome.get();
    $.each(pages, function(k, page){
        $('#sites-list').append('<tr>' + tagify(page) + '</tr>');
    });
}

function addRow(data) {
    var row = $('<tr></tr>');
    $.each(data, function(k, v){
        row.append('<td>' + v + '</td>');
    });
    $('#sites-list').append(row);
    log('Done drawing options table!');
}

function initOptions() {
    var pages = _get({'pages': window.location.hostname});
}

$(document).ready(initOptions);
