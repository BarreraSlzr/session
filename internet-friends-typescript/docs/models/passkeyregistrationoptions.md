# PasskeyRegistrationOptions

## Example Usage

```typescript
import { PasskeyRegistrationOptions } from "internet-friends";

let value: PasskeyRegistrationOptions = {
  challenge: "<value>",
  timeout: 138435,
  rp: {
    name: "<value>",
    id: "<id>",
  },
  user: {
    id: "<id>",
    name: "<value>",
    displayName: "Darrin_OConner38",
  },
  pubKeyCredParams: [
    {},
  ],
  authenticatorSelection: {
    authenticatorAttachment: "<value>",
    requireResidentKey: false,
    userVerification: "<value>",
  },
  attestation: "<value>",
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `challenge`                                                          | *string*                                                             | :heavy_check_mark:                                                   | Base64-encoded challenge                                             |
| `timeout`                                                            | *number*                                                             | :heavy_check_mark:                                                   | Timeout in milliseconds                                              |
| `rp`                                                                 | [models.Rp](../models/rp.md)                                         | :heavy_check_mark:                                                   | N/A                                                                  |
| `user`                                                               | [models.User](../models/user.md)                                     | :heavy_check_mark:                                                   | N/A                                                                  |
| `pubKeyCredParams`                                                   | [models.PubKeyCredParam](../models/pubkeycredparam.md)[]             | :heavy_check_mark:                                                   | N/A                                                                  |
| `authenticatorSelection`                                             | [models.AuthenticatorSelection](../models/authenticatorselection.md) | :heavy_check_mark:                                                   | N/A                                                                  |
| `attestation`                                                        | *string*                                                             | :heavy_check_mark:                                                   | Attestation conveyance preference                                    |