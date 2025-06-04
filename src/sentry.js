// sentry.js
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'https://31af8a0e9a179f2f2d48beb545872759@o4509420767543296.ingest.us.sentry.io/4509420773507072',
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});

export default Sentry;
