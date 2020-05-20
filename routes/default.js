const axios = require('axios').default;
const moment = require('moment');
const url = require('url');
const config = require('../config.js');
const helper = require('../lib/helper.js');

async function defaultRoute (server, options) {
    server.get('/', async (request, reply) => {

        var hostname = url.parse(request.query.url).hostname;
        
        var mime = '';
        var listmime = [
            'apng','jpg','jpeg','gif','bmp','png','tiff','webp'
        ];
        if(request.query.mime) {
            mime = request.query.mime;
        } else {
            mime = request.query.url.split('.').slice(-1).pop();
            if (!helper.inArray(listmime,mime)) {
                reply.code(400);
                return reply.send({code:"400",message:"Can\'t detect mime type or maybe was not supported! Please use parameter mime."});
            }
        }

        var newheaders = {
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'cache-control': 'no-cache',
            'connection': 'keep-alive',
            'cookie': '__cfduid=d491ad3fc1008f5af257f8cff238d09f31589283767',
            'host': hostname,
            'postman-token': 'fc32bbe8-ca22-4a62-8e70-3f134af29ea8,3d1c666c-56f9-48ba-93a3-32957c51ffbe',
            'user-agent': 'PostmanRuntime/7.15.2',
        };
        if(request.query.referer) {
            newheaders.referer = request.query.referer; 
        }

        var resheaders = {
            'Cache-Control': 'public, must-revalidate, maxage='+config.maxage,
            'Content-Type': 'image/'+mime,
            'Expires': moment().add(config.maxage,'seconds').utc().format('ddd, DD MMM YYYY HH:mm:ss')+' GMT',
            'Sec-Fetch-Dest': 'image',
            'Pragma': 'public',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Etag'
        }

        axios({
                method: 'get',
                url: request.query.url,
                responseType: 'stream',
                headers: newheaders,
                timeout: config.timeout
            })
            .then(function (response) {
                reply.code(200);
                resheaders['content-length'] = response.headers['content-length'];
                reply.headers(resheaders);
                reply.send(response.data);
            })
            .catch(function (error) {
                reply.code(error.response.status).send({code:error.response.status,message:error.message});
            });

        await reply;
    });
}
  
module.exports = defaultRoute;