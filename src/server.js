import app from './app.js';

const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
  console.log(`Task Management API is running on port ${port}`);
});
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
      (e._sentryDebugIds[n] = '249f0c47-5600-5351-b97c-12ac1791bbb4'));
  } catch (e) {}
})();
