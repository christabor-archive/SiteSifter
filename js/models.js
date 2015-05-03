function SiteGroup(name, sites, theme) {
    var self = this;
    this.name = name || '';
    this.sites = sites || [];
    this.theme = theme || null;
}

function CleanedSite(data) {
    var self = this;
    this.url = data.url || null;
    this.theme = data.theme || null;
    this.is_active = data.is_active || true;
    this.dom_data = data.dom_data || null;

    this.serializeData = function() {
        var obj = {
            url: self.url,
            theme: self.theme,
            dom_data: self.dom_data,
            is_active: self.is_active
        };
        return obj;
        // TODO: decide of JSON is necessary - chrome supports
        // objects directly, whereas localStorage does not.
        // see https://developer.chrome.com/extensions/storage
        // return JSON.stringify();
    };
    this.save = function(callback) {
        // Data is keyed by url, and stored as a json string.
        var data = self.serializeData();
        var obj = {};
        var url = self.url;
        obj[self.url] = data;
        log('data to be saved:', obj);
        chrome.storage.sync.set(obj, callback || function(){
            chrome.storage.sync.get(url, function(data){
                log('Retrieving saved site: ' + url + ' from cache.', data);
            });
        });
    };
}

function Theme(styles) {
    var self = this;
    // TODO
}
