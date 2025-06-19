# Passkeys
(*passkeys*)

## Overview

### Available Operations

* [getGenerateAuthenticateOptions](#getgenerateauthenticateoptions) - Generate authentication options for passkey login
* [getGenerateRegisterOptions](#getgenerateregisteroptions) - Generate registration options for passkey
* [verifyAuthentication](#verifyauthentication) - Verify passkey authentication response
* [verifyRegistration](#verifyregistration) - Verify passkey registration response

## getGenerateAuthenticateOptions

Generates WebAuthn authentication options for passkey-based login

### Example Usage

```typescript
import { InternetFriends } from "internet-friends";

const internetFriends = new InternetFriends({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const result = await internetFriends.passkeys.getGenerateAuthenticateOptions();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { InternetFriendsCore } from "internet-friends/core.js";
import { passkeysGetGenerateAuthenticateOptions } from "internet-friends/funcs/passkeysGetGenerateAuthenticateOptions.js";

// Use `InternetFriendsCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const internetFriends = new InternetFriendsCore({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const res = await passkeysGetGenerateAuthenticateOptions(internetFriends);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("passkeysGetGenerateAuthenticateOptions failed:", res.error);
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

**Promise\<[models.PasskeyAuthenticationOptions](../../models/passkeyauthenticationoptions.md)\>**

### Errors

| Error Type                         | Status Code                        | Content Type                       |
| ---------------------------------- | ---------------------------------- | ---------------------------------- |
| errors.ErrorT                      | 401                                | application/json                   |
| errors.ErrorT                      | 500                                | application/json                   |
| errors.InternetFriendsDefaultError | 4XX, 5XX                           | \*/\*                              |

## getGenerateRegisterOptions

Generates WebAuthn registration options for creating a new passkey

### Example Usage

```typescript
import { InternetFriends } from "internet-friends";

const internetFriends = new InternetFriends({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const result = await internetFriends.passkeys.getGenerateRegisterOptions();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { InternetFriendsCore } from "internet-friends/core.js";
import { passkeysGetGenerateRegisterOptions } from "internet-friends/funcs/passkeysGetGenerateRegisterOptions.js";

// Use `InternetFriendsCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const internetFriends = new InternetFriendsCore({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const res = await passkeysGetGenerateRegisterOptions(internetFriends);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("passkeysGetGenerateRegisterOptions failed:", res.error);
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

**Promise\<[models.PasskeyRegistrationOptions](../../models/passkeyregistrationoptions.md)\>**

### Errors

| Error Type                         | Status Code                        | Content Type                       |
| ---------------------------------- | ---------------------------------- | ---------------------------------- |
| errors.ErrorT                      | 401                                | application/json                   |
| errors.ErrorT                      | 500                                | application/json                   |
| errors.InternetFriendsDefaultError | 4XX, 5XX                           | \*/\*                              |

## verifyAuthentication

Verifies a WebAuthn authentication response from the client

### Example Usage

```typescript
import { InternetFriends } from "internet-friends";

const internetFriends = new InternetFriends({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const result = await internetFriends.passkeys.verifyAuthentication({
    response: "<value>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { InternetFriendsCore } from "internet-friends/core.js";
import { passkeysVerifyAuthentication } from "internet-friends/funcs/passkeysVerifyAuthentication.js";

// Use `InternetFriendsCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const internetFriends = new InternetFriendsCore({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const res = await passkeysVerifyAuthentication(internetFriends, {
    response: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("passkeysVerifyAuthentication failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.PasskeyVerificationRequest](../../models/passkeyverificationrequest.md)                                                                                                | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.PasskeyVerificationSuccess](../../models/passkeyverificationsuccess.md)\>**

### Errors

| Error Type                         | Status Code                        | Content Type                       |
| ---------------------------------- | ---------------------------------- | ---------------------------------- |
| errors.ErrorT                      | 400, 401                           | application/json                   |
| errors.ErrorT                      | 500                                | application/json                   |
| errors.InternetFriendsDefaultError | 4XX, 5XX                           | \*/\*                              |

## verifyRegistration

Verifies a WebAuthn registration response from the client

### Example Usage

```typescript
import { InternetFriends } from "internet-friends";

const internetFriends = new InternetFriends({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const result = await internetFriends.passkeys.verifyRegistration({
    response: "<value>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { InternetFriendsCore } from "internet-friends/core.js";
import { passkeysVerifyRegistration } from "internet-friends/funcs/passkeysVerifyRegistration.js";

// Use `InternetFriendsCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const internetFriends = new InternetFriendsCore({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const res = await passkeysVerifyRegistration(internetFriends, {
    response: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("passkeysVerifyRegistration failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.PasskeyVerificationRequest](../../models/passkeyverificationrequest.md)                                                                                                | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.PasskeyRegistrationSuccess](../../models/passkeyregistrationsuccess.md)\>**

### Errors

| Error Type                         | Status Code                        | Content Type                       |
| ---------------------------------- | ---------------------------------- | ---------------------------------- |
| errors.ErrorT                      | 400, 401                           | application/json                   |
| errors.ErrorT                      | 500                                | application/json                   |
| errors.InternetFriendsDefaultError | 4XX, 5XX                           | \*/\*                              |