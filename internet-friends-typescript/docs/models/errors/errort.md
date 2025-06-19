# ErrorT

## Example Usage

```typescript
import { ErrorT } from "internet-friends/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   | Example                                                                                       |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `error`                                                                                       | *string*                                                                                      | :heavy_check_mark:                                                                            | Human-readable error message                                                                  |                                                                                               |
| `code`                                                                                        | *string*                                                                                      | :heavy_minus_sign:                                                                            | Machine-readable error code                                                                   | SESSION_TOKEN_INVALID                                                                         |
| `details`                                                                                     | Record<string, *any*>                                                                         | :heavy_minus_sign:                                                                            | Additional error details                                                                      |                                                                                               |
| `timestamp`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | ISO timestamp when the error occurred                                                         |                                                                                               |