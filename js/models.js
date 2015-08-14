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
    this.stripped = data.stripped || false;

    this.serializeData = function() {
        var obj = {
            url: self.url,
            theme: self.theme,
            dom_data: self.dom_data,
            is_active: self.is_active,
            stripped: self.stripped
        };
        return obj;
    };
    this.save = function(callback) {
        // Data is keyed by url, and stored as a json string.
        var data = self.serializeData();
        var obj = {};
        var url = self.url;
        obj[self.url] = data;
        console.log('data to be saved:', obj);
        chrome.storage.sync.set(obj, callback || function(){
            console.log('Saving site: ' + url);
            chrome.storage.sync.get(url, function(data){
                console.log('Retrieving saved site: ' + url + ' from cache: ', data);
            });
        });
    };
}

function Theme(styles) {
    var self = this;
    // TODO
}
