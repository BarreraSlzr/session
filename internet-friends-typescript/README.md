# internet-friends

Developer-friendly & type-safe Typescript SDK specifically catered to leverage *internet-friends* API.

<div align="left">
    <a href="https://www.speakeasy.com/?utm_source=internet-friends&utm_campaign=typescript"><img src="https://custom-icon-badges.demolab.com/badge/-Built%20By%20Speakeasy-212015?style=for-the-badge&logoColor=FBE331&logo=speakeasy&labelColor=545454" /></a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" style="width: 100px; height: 28px;" />
    </a>
</div>


<br /><br />
> [!IMPORTANT]
> This SDK is not yet ready for production use. To complete setup please follow the steps outlined in your [workspace](https://app.speakeasy.com/org/internetfriends/sessions). Delete this section before > publishing to a package manager.

<!-- Start Summary [summary] -->
## Summary

Session & Passkey API: API documentation for session and passkey authentication endpoints.

This API provides authentication services including:
- Session management (create, validate, renew, destroy)
- Passkey authentication (generate options, verify responses)
- User management
- Error handling with standardized error codes

All endpoints return consistent error responses with machine-readable codes.
<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [internet-friends](#internet-friends)
  * [SDK Installation](#sdk-installation)
  * [Requirements](#requirements)
  * [SDK Example Usage](#sdk-example-usage)
  * [Authentication](#authentication)
  * [Available Resources and Operations](#available-resources-and-operations)
  * [Standalone functions](#standalone-functions)
  * [Retries](#retries)
  * [Error Handling](#error-handling)
  * [Custom HTTP Client](#custom-http-client)
  * [Debugging](#debugging)
* [Development](#development)
  * [Maturity](#maturity)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

> [!TIP]
> To finish publishing your SDK to npm and others you must [run your first generation action](https://www.speakeasy.com/docs/github-setup#step-by-step-guide).


The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add <UNSET>
```

### PNPM

```bash
pnpm add <UNSET>
```

### Bun

```bash
bun add <UNSET>
```

### Yarn

```bash
yarn add <UNSET> zod

# Note that Yarn does not install peer dependencies automatically. You will need
# to install zod as shown above.
```

> [!NOTE]
> This package is published with CommonJS and ES Modules (ESM) support.


### Model Context Protocol (MCP) Server

This SDK is also an installable MCP server where the various SDK methods are
exposed as tools that can be invoked by AI applications.

> Node.js v20 or greater is required to run the MCP server from npm.

<details>
<summary>Claude installation steps</summary>

Add the following server definition to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "InternetFriends": {
      "command": "npx",
      "args": [
        "-y", "--package", "internet-friends",
        "--",
        "mcp", "start",
        "--server-url", "...",
        "--session-auth", "..."
      ]
    }
  }
}
```

</details>

<details>
<summary>Cursor installation steps</summary>

Create a `.cursor/mcp.json` file in your project root with the following content:

```json
{
  "mcpServers": {
    "InternetFriends": {
      "command": "npx",
      "args": [
        "-y", "--package", "internet-friends",
        "--",
        "mcp", "start",
        "--server-url", "...",
        "--session-auth", "..."
      ]
    }
  }
}
```

</details>

You can also run MCP servers as a standalone binary with no additional dependencies. You must pull these binaries from available Github releases:

```bash
curl -L -o mcp-server \
    https://github.com/{org}/{repo}/releases/download/{tag}/mcp-server-bun-darwin-arm64 && \
chmod +x mcp-server
```

If the repo is a private repo you must add your Github PAT to download a release `-H "Authorization: Bearer {GITHUB_PAT}"`.


```json
{
  "mcpServers": {
    "Todos": {
      "command": "./DOWNLOAD/PATH/mcp-server",
      "args": [
        "start"
      ]
    }
  }
}
```

For a full list of server arguments, run:

```sh
npx -y --package internet-friends -- mcp start --help
```
<!-- End SDK Installation [installation] -->

<!-- Start Requirements [requirements] -->
## Requirements

For supported JavaScript runtimes, please consult [RUNTIMES.md](RUNTIMES.md).
<!-- End Requirements [requirements] -->

<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Example

```typescript
import { InternetFriends } from "internet-friends";

const internetFriends = new InternetFriends({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const result = await internetFriends.passkeys
    .getGenerateAuthenticateOptions();

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->

<!-- Start Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security scheme globally:

| Name          | Type   | Scheme  | Environment Variable           |
| ------------- | ------ | ------- | ------------------------------ |
| `sessionAuth` | apiKey | API key | `INTERNETFRIENDS_SESSION_AUTH` |

To authenticate with the API the `sessionAuth` parameter must be set when initializing the SDK client instance. For example:
```typescript
import { InternetFriends } from "internet-friends";

const internetFriends = new InternetFriends({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const result = await internetFriends.passkeys
    .getGenerateAuthenticateOptions();

  console.log(result);
}

run();

```
<!-- End Authentication [security] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

<details open>
<summary>Available methods</summary>


### [passkeys](docs/sdks/passkeys/README.md)

* [getGenerateAuthenticateOptions](docs/sdks/passkeys/README.md#getgenerateauthenticateoptions) - Generate authentication options for passkey login
* [getGenerateRegisterOptions](docs/sdks/passkeys/README.md#getgenerateregisteroptions) - Generate registration options for passkey
* [verifyAuthentication](docs/sdks/passkeys/README.md#verifyauthentication) - Verify passkey authentication response
* [verifyRegistration](docs/sdks/passkeys/README.md#verifyregistration) - Verify passkey registration response

### [sessions](docs/sdks/sessions/README.md)

* [status](docs/sdks/sessions/README.md#status) - Check session status
* [renew](docs/sdks/sessions/README.md#renew) - Renew session
* [destroy](docs/sdks/sessions/README.md#destroy) - Destroy session

</details>
<!-- End Available Resources and Operations [operations] -->

<!-- Start Standalone functions [standalone-funcs] -->
## Standalone functions

All the methods listed above are available as standalone functions. These
functions are ideal for use in applications running in the browser, serverless
runtimes or other environments where application bundle size is a primary
concern. When using a bundler to build your application, all unused
functionality will be either excluded from the final bundle or tree-shaken away.

To read more about standalone functions, check [FUNCTIONS.md](./FUNCTIONS.md).

<details>

<summary>Available standalone functions</summary>

- [`passkeysGetGenerateAuthenticateOptions`](docs/sdks/passkeys/README.md#getgenerateauthenticateoptions) - Generate authentication options for passkey login
- [`passkeysGetGenerateRegisterOptions`](docs/sdks/passkeys/README.md#getgenerateregisteroptions) - Generate registration options for passkey
- [`passkeysVerifyAuthentication`](docs/sdks/passkeys/README.md#verifyauthentication) - Verify passkey authentication response
- [`passkeysVerifyRegistration`](docs/sdks/passkeys/README.md#verifyregistration) - Verify passkey registration response
- [`sessionsDestroy`](docs/sdks/sessions/README.md#destroy) - Destroy session
- [`sessionsRenew`](docs/sdks/sessions/README.md#renew) - Renew session
- [`sessionsStatus`](docs/sdks/sessions/README.md#status) - Check session status

</details>
<!-- End Standalone functions [standalone-funcs] -->

<!-- Start Retries [retries] -->
## Retries

Some of the endpoints in this SDK support retries.  If you use the SDK without any configuration, it will fall back to the default retry strategy provided by the API.  However, the default retry strategy can be overridden on a per-operation basis, or across the entire SDK.

To change the default retry strategy for a single API call, simply provide a retryConfig object to the call:
```typescript
import { InternetFriends } from "internet-friends";

const internetFriends = new InternetFriends({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const result = await internetFriends.passkeys.getGenerateAuthenticateOptions({
    retries: {
      strategy: "backoff",
      backoff: {
        initialInterval: 1,
        maxInterval: 50,
        exponent: 1.1,
        maxElapsedTime: 100,
      },
      retryConnectionErrors: false,
    },
  });

  console.log(result);
}

run();

```

If you'd like to override the default retry strategy for all operations that support retries, you can provide a retryConfig at SDK initialization:
```typescript
import { InternetFriends } from "internet-friends";

const internetFriends = new InternetFriends({
  serverURL: "https://api.example.com",
  retryConfig: {
    strategy: "backoff",
    backoff: {
      initialInterval: 1,
      maxInterval: 50,
      exponent: 1.1,
      maxElapsedTime: 100,
    },
    retryConnectionErrors: false,
  },
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  const result = await internetFriends.passkeys
    .getGenerateAuthenticateOptions();

  console.log(result);
}

run();

```
<!-- End Retries [retries] -->

<!-- Start Error Handling [errors] -->
## Error Handling

[`InternetFriendsError`](./src/models/errors/internetfriendserror.ts) is the base class for all HTTP error responses. It has the following properties:

| Property            | Type       | Description                                                                             |
| ------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `error.message`     | `string`   | Error message                                                                           |
| `error.statusCode`  | `number`   | HTTP response status code eg `404`                                                      |
| `error.headers`     | `Headers`  | HTTP response headers                                                                   |
| `error.body`        | `string`   | HTTP body. Can be empty string if no body is returned.                                  |
| `error.rawResponse` | `Response` | Raw HTTP response                                                                       |
| `error.data$`       |            | Optional. Some errors may contain structured data. [See Error Classes](#error-classes). |

### Example
```typescript
import { InternetFriends } from "internet-friends";
import * as errors from "internet-friends/models/errors";

const internetFriends = new InternetFriends({
  serverURL: "https://api.example.com",
  sessionAuth: process.env["INTERNETFRIENDS_SESSION_AUTH"] ?? "",
});

async function run() {
  try {
    const result = await internetFriends.passkeys
      .getGenerateAuthenticateOptions();

    console.log(result);
  } catch (error) {
    // The base class for HTTP error responses
    if (error instanceof errors.InternetFriendsError) {
      console.log(error.message);
      console.log(error.statusCode);
      console.log(error.body);
      console.log(error.headers);

      // Depending on the method different errors may be thrown
      if (error instanceof errors.ErrorT) {
        console.log(error.data$.error); // string
        console.log(error.data$.code); // string
        console.log(error.data$.details); // { [k: string]: any }
        console.log(error.data$.timestamp); // Date
      }
    }
  }
}

run();

```

### Error Classes
**Primary errors:**
* [`InternetFriendsError`](./src/models/errors/internetfriendserror.ts): The base class for HTTP error responses.
  * [`ErrorT`](docs/models/errors/errort.md): Generic error.

<details><summary>Less common errors (6)</summary>

<br />

**Network errors:**
* [`ConnectionError`](./src/models/errors/httpclienterrors.ts): HTTP client was unable to make a request to a server.
* [`RequestTimeoutError`](./src/models/errors/httpclienterrors.ts): HTTP request timed out due to an AbortSignal signal.
* [`RequestAbortedError`](./src/models/errors/httpclienterrors.ts): HTTP request was aborted by the client.
* [`InvalidRequestError`](./src/models/errors/httpclienterrors.ts): Any input used to create a request is invalid.
* [`UnexpectedClientError`](./src/models/errors/httpclienterrors.ts): Unrecognised or unexpected error.


**Inherit from [`InternetFriendsError`](./src/models/errors/internetfriendserror.ts)**:
* [`ResponseValidationError`](./src/models/errors/responsevalidationerror.ts): Type mismatch between the data returned from the server and the structure expected by the SDK. See `error.rawValue` for the raw value and `error.pretty()` for a nicely formatted multi-line string.

</details>
<!-- End Error Handling [errors] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The TypeScript SDK makes API calls using an `HTTPClient` that wraps the native
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This
client is a thin wrapper around `fetch` and provides the ability to attach hooks
around the request lifecycle that can be used to modify the request or handle
errors and response.

The `HTTPClient` constructor takes an optional `fetcher` argument that can be
used to integrate a third-party HTTP client or when writing tests to mock out
the HTTP client and feed in fixtures.

The following example shows how to use the `"beforeRequest"` hook to to add a
custom header and a timeout to requests and how to use the `"requestError"` hook
to log errors:

```typescript
import { InternetFriends } from "internet-friends";
import { HTTPClient } from "internet-friends/lib/http";

const httpClient = new HTTPClient({
  // fetcher takes a function that has the same signature as native `fetch`.
  fetcher: (request) => {
    return fetch(request);
  }
});

httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request, {
    signal: request.signal || AbortSignal.timeout(5000)
  });

  nextRequest.headers.set("x-custom-header", "custom value");

  return nextRequest;
});

httpClient.addHook("requestError", (error, request) => {
  console.group("Request Error");
  console.log("Reason:", `${error}`);
  console.log("Endpoint:", `${request.method} ${request.url}`);
  console.groupEnd();
});

const sdk = new InternetFriends({ httpClient });
```
<!-- End Custom HTTP Client [http-client] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { InternetFriends } from "internet-friends";

const sdk = new InternetFriends({ debugLogger: console });
```

You can also enable a default debug logger by setting an environment variable `INTERNETFRIENDS_DEBUG` to true.
<!-- End Debugging [debug] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, this library is generated programmatically. Any manual changes added to internal files will be overwritten on the next generation. 
We look forward to hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our best to include it in a future release. 

### SDK Created by [Speakeasy](https://www.speakeasy.com/?utm_source=internet-friends&utm_campaign=typescript)
