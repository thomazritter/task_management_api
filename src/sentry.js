// sentry.js
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'https://31af8a0e9a179f2f2d48beb545872759@o4509420767543296.ingest.us.sentry.io/4509420773507072',
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});

export default Sentry;
!(function () {
  try {
    var e =
        'undefined' != typeof window
          ? window
          : 'undefined' != typeof global
            ? global
            : 'undefined' != typeof globalThis
              ? globalThis
              : 'undefined' != typeof self
                ? self
                : {},
      n = new e.Error().stack;
    n &&
      ((e._sentryDebugIds = e._sentryDebugIds || {}),
      (e._sentryDebugIds[n] = '21fd99f7-5e61-564a-b598-fd69ff1f7c85'));
  } catch (e) {}
})();
//# debugId=21fd99f7-5e61-564a-b598-fd69ff1f7c85
