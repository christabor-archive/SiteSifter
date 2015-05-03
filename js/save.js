// TODO: save parsed html if specified.
var use_origin = $('[name="use-origin"]').is(':checked');
var site = new CleanedSite({
    url: use_origin ? window.location.origin : window.location.href,
    is_active: true,
    dom_data: '<html></html>',
    theme: 'default'
});
console.log(site);
site.save();
