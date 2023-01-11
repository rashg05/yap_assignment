if (process.env.ENVIRONMENT !== 'yap-local') {
  // eslint-disable-next-line import/no-unresolved,no-unused-vars,global-require
  const tracer = require('dd-trace').init();
  tracer.use('http', {
    blocklist: ['/'],
  });
}

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const { error } = require('@yapsody/lib-handlers');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const config = require('./config');
const apiRoutes = require('./routes');

const app = express();
const enableSentry = (process.env.ENVIRONMENT !== 'yap-local' && config.SENTRY_PROJECT_DSN.length !== 0);
if (enableSentry) {
  Sentry.init({
    dsn: config.SENTRY_PROJECT_DSN,
    environment: config.ENVIRONMENT,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 0.02,
    sampleRate: 1.0,
    denyUrls: [
      '/',
    ],
  });
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'pong' });
});

// use routes
app.use(apiRoutes);

if (enableSentry) { app.use(Sentry.Handlers.errorHandler()); }

// global error handler
app.use(error.handler);

const server = app.listen(config.APP_PORT, config.APP_HOST, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
  // eslint-disable-next-line no-console
  console.info(`Server running on http://${config.APP_HOST}:${config.APP_PORT}`);
});

// shut down server
const shutdown = () => {
  server.close((err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exitCode = 1;
    }
    process.exit();
  });
};

// This signal interrupts a process immediately.
// The default action of this signal is to terminate a process gracefully .
// It can be handled , ignored or caught.
// It can be sent from a terminal as input characters.
// This signal is generated when a user presses Ctrl+C.
process.on('SIGINT', () => {
  // eslint-disable-next-line no-console
  console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// This signal terminates a process immediately.
// This can also be handled ,ignored.
// This is also used for graceful termination of a process.
// The only difference is that It is generated by shell command kill by default.
process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

module.exports = app;
