console.log(params);
// TODO: save parsed html if specified.
console.log('USE ORIGIN ? ' + params.use_origin);
var site = new CleanedSite({
    url: params.use_origin ? window.location.origin : window.location.href,
    is_active: true,
    dom_data: null,
    theme: 'default'
});
console.log('Saving!');
console.log(site);
site.save();
