# AuthenticatorSelection

## Example Usage

```typescript
import { AuthenticatorSelection } from "internet-friends";

let value: AuthenticatorSelection = {
  authenticatorAttachment: "<value>",
  requireResidentKey: false,
  userVerification: "<value>",
};
```

## Fields

| Field                               | Type                                | Required                            | Description                         |
| ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- |
| `authenticatorAttachment`           | *string*                            | :heavy_check_mark:                  | Authenticator attachment preference |
| `requireResidentKey`                | *boolean*                           | :heavy_check_mark:                  | Whether resident key is required    |
| `userVerification`                  | *string*                            | :heavy_check_mark:                  | User verification requirement       |