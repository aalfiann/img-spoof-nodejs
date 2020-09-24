const config = require('./config.js')
const helper = require('./lib/helper.js')
const md5 = require('md5')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const server = require('fastify')({
  logger: config.logger
})

const App = async () => {
  server.addHook('onRequest', async (request, reply) => {
    if (request.raw.url === '/favicon.ico') {
      return reply.code(404).send()
    }

    if (config.firewall_request) {
      if (request.headers.referer) {
        var origin = new URL(request.headers.referer).hostname
        if (!helper.inArray(config.allow_domain, origin)) {
          return reply.code(403).send({ code: 403, message: 'You don\'t have direct access to this service!' })
        }
      } else {
        if (!config.allow_no_referer) {
          return reply.code(403).send({ code: 403, message: 'You don\'t have direct access to this service!' })
        }
      }
    }

    if (request.query.url) {
      request.query.url = helper.rawurldecode(request.query.url)
      request.query.referer = ((request.query.referer === undefined) ? '' : helper.rawurldecode(request.query.referer))
      request.query.mime = ((request.query.mime === undefined) ? '' : request.query.mime)
      request.query._ = ((request.query._ === undefined) ? '' : helper.rawurldecode(request.query._))
      request.query.v = ((request.query.v === undefined) ? '' : helper.rawurldecode(request.query.v))
      var etag = '"' + md5(request.query.url + request.query.referer + request.query.mime + request.query._ + request.query.v) + '"'
      if (request.headers['if-none-match'] === etag) {
        return reply.code(304).send('')
      }
      reply.header('Etag', etag)
    } else {
      return reply.code(400).send({ code: 400, message: 'Wrong parameter! Parameter url is required.' })
    }
  })

  server.register(require('./routes/default.js'))

  // Custom Error Handler
  server.setErrorHandler(function (error, request, reply) {
    server.log.error(error)
    reply.send({ code: 500, message: 'Whoops, Something went wrong!' })
  })

  const start = async () => {
    try {
      await server.listen(config.port)
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
  }
  start()
}

if (config.useWorker) {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
    }
    cluster.on('exit', worker => {
      console.log(`Worker ${worker.process.pid} died`)
    })
  } else {
    App()
  }
} else {
  App()
}
