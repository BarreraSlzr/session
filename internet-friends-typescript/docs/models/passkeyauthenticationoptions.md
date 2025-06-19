# PasskeyAuthenticationOptions

## Example Usage

```typescript
import { PasskeyAuthenticationOptions } from "internet-friends";

let value: PasskeyAuthenticationOptions = {
  challenge: "<value>",
  timeout: 38772,
  rpId: "<id>",
  userVerification: "<value>",
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `challenge`                                              | *string*                                                 | :heavy_check_mark:                                       | Base64-encoded challenge                                 |
| `timeout`                                                | *number*                                                 | :heavy_check_mark:                                       | Timeout in milliseconds                                  |
| `rpId`                                                   | *string*                                                 | :heavy_check_mark:                                       | Relying party ID                                         |
| `allowCredentials`                                       | [models.AllowCredential](../models/allowcredential.md)[] | :heavy_minus_sign:                                       | N/A                                                      |
| `userVerification`                                       | *string*                                                 | :heavy_check_mark:                                       | User verification requirement                            |