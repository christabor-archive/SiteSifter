console.log('save.js PARAMS: ', params);
// TODO: save parsed html if specified.
console.log('USE ORIGIN ? ' + params.use_origin);
var site = new CleanedSite({
    url: params.use_origin ? window.location.origin : window.location.href,
    is_active: true,
    dom_data: null,
    theme: params.theme || 'default'
});
console.log('Saving!');
console.log(site);
site.save(function(){
    window.location.href = window.location.href;
});
