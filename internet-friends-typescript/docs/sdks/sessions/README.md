# Sessions
(*sessions*)

## Overview

### Available Operations

* [status](#status) - Check session status
* [renew](#renew) - Renew session
* [destroy](#destroy) - Destroy session

## status

Validates the current session and returns user information

### Example Usage

```typescript
import { InternetFriends } from "internet-friends";

const internetFriends = new InternetFriends({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const result = await internetFriends.sessions.status();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { InternetFriendsCore } from "internet-friends/core.js";
import { sessionsStatus } from "internet-friends/funcs/sessionsStatus.js";

// Use `InternetFriendsCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const internetFriends = new InternetFriendsCore({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const res = await sessionsStatus(internetFriends);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("sessionsStatus failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.SessionStatus](../../models/sessionstatus.md)\>**

### Errors

| Error Type                         | Status Code                        | Content Type                       |
| ---------------------------------- | ---------------------------------- | ---------------------------------- |
| errors.ErrorT                      | 401                                | application/json                   |
| errors.ErrorT                      | 500                                | application/json                   |
| errors.InternetFriendsDefaultError | 4XX, 5XX                           | \*/\*                              |

## renew

Creates a new session token and extends the session duration

### Example Usage

```typescript
import { InternetFriends } from "internet-friends";

const internetFriends = new InternetFriends({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const result = await internetFriends.sessions.renew();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { InternetFriendsCore } from "internet-friends/core.js";
import { sessionsRenew } from "internet-friends/funcs/sessionsRenew.js";

// Use `InternetFriendsCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const internetFriends = new InternetFriendsCore({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const res = await sessionsRenew(internetFriends);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("sessionsRenew failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.SessionRenew](../../models/sessionrenew.md)\>**

### Errors

| Error Type                         | Status Code                        | Content Type                       |
| ---------------------------------- | ---------------------------------- | ---------------------------------- |
| errors.ErrorT                      | 401                                | application/json                   |
| errors.ErrorT                      | 500                                | application/json                   |
| errors.InternetFriendsDefaultError | 4XX, 5XX                           | \*/\*                              |

## destroy

Invalidates the current session and logs the user out

### Example Usage

```typescript
import { InternetFriends } from "internet-friends";

const internetFriends = new InternetFriends({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const result = await internetFriends.sessions.destroy();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { InternetFriendsCore } from "internet-friends/core.js";
import { sessionsDestroy } from "internet-friends/funcs/sessionsDestroy.js";

// Use `InternetFriendsCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const internetFriends = new InternetFriendsCore({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const res = await sessionsDestroy(internetFriends);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("sessionsDestroy failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.SessionDestroy](../../models/sessiondestroy.md)\>**

### Errors

| Error Type                         | Status Code                        | Content Type                       |
| ---------------------------------- | ---------------------------------- | ---------------------------------- |
| errors.ErrorT                      | 401                                | application/json                   |
| errors.ErrorT                      | 500                                | application/json                   |
| errors.InternetFriendsDefaultError | 4XX, 5XX                           | \*/\*                              |