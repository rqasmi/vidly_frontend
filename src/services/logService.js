import * as Sentry from "@sentry/react";

/**
 * Initializes a log service from Sentry.
 */

function init() {
  Sentry.init({
    dsn:
      "https://3a17848cfe33429a80882a24cfba3c59@o426083.ingest.sentry.io/5369765",
  });
}

/**
 *
 * @param {*} error
 *
 * Captures and logs the exception to Sentry.
 */
function log(error) {
  Sentry.captureException(error);
  // console.log(error);
}

export default {
  init,
  log,
};
