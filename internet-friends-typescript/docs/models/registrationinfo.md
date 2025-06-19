# RegistrationInfo

## Example Usage

```typescript
import { RegistrationInfo } from "internet-friends";

let value: RegistrationInfo = {
  credentialID: "<id>",
  credentialPublicKey: "<value>",
  counter: 299273,
};
```

## Fields

| Field                        | Type                         | Required                     | Description                  |
| ---------------------------- | ---------------------------- | ---------------------------- | ---------------------------- |
| `credentialID`               | *string*                     | :heavy_check_mark:           | Base64-encoded credential ID |
| `credentialPublicKey`        | *string*                     | :heavy_check_mark:           | Base64-encoded public key    |
| `counter`                    | *number*                     | :heavy_check_mark:           | Signature counter            |