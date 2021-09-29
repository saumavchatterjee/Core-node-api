const notfound ={};

notfound.pagenotfound = (requestobj, callback) =>
{
    callback(404, 'Page Not Found!');
}

module.exports = notfound;