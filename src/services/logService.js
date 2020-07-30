import * as Sentry from "@sentry/react";

function init() {
  // Sentry.init({
  //   dsn:
  //     "https://3a17848cfe33429a80882a24cfba3c59@o426083.ingest.sentry.io/5369765",
  // });
}

function log(error) {
  Sentry.captureException(error);
  console.log(error);
}

export default {
  init,
  log,
};
