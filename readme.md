# img-spoof-nodejs

![Version](https://img.shields.io/github/package-json/v/aalfiann/img-spoof-nodejs)
[![Build Status](https://travis-ci.com/aalfiann/img-spoof-nodejs.svg?branch=master)](https://travis-ci.com/aalfiann/img-spoof-nodejs)
[![Coverage Status](https://coveralls.io/repos/github/aalfiann/img-spoof-nodejs/badge.svg?branch=master)](https://coveralls.io/github/aalfiann/img-spoof-nodejs?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/aalfiann/img-spoof-nodejs/badge.svg)](https://snyk.io/test/github/aalfiann/img-spoof-nodejs)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![GitHub](https://img.shields.io/github/license/aalfiann/img-spoof-nodejs)

This is a very simple and fast to get an image with spoofing referer [NodeJS].

## Features
- **Spoofing Image Referer**  
  You are able to get a protected remote image by spoofing it. 
- **Very Fast**  
  Built with Fastify Framework (the fastest nodejs framework).
- **Efficient**  
  CPU clustered and using response stream.
- **Shared Proxy Cache**  
  A remote image is not downloaded but will be saved on client browser or proxy cache.
- **Firewall Request**  
  You are able to set this service to work on spesific domain only (protected from direct access).

## Installation

1. Download or clone this repo.
2. Install with `npm install`.
3. Upload to your server.
4. Run `node server.js`

**Note:**  
- See `config.js` to set firewall and adjust max-age for cache.

## Query Parameter
- **url** : URL Image target.
- **referer** : Set the referer image. [`optional`]
- **mime** : Set the mime type of image (ex: png). [`optional`]
- **v** : Set the version to refresh cache. [`optional`]

**Note:**  
- Mime type will detect automatically if the url included extension.
- jQuery Ajax `cache: false` will detected automatically.

## Example

This will GET image with spoofing referer.

```html
<html>
    <head>
    </head>
    <body>
        <img src="http://localhost:3000/?referer=https://manganelo.com&url=https://s7.mkklcdnv7.com/mangakakalot/l2/love_parameter/chapter_112_qa/1.jpg">
    </body>
</html>
```

## Alternative
If you don't have hosting for NodeJS, we have the PHP version of this project.  
Here is the PHP version >> [https://github.com/aalfiann/img-spoof](https://github.com/aalfiann/img-spoof)