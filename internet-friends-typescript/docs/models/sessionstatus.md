# SessionStatus

## Example Usage

```typescript
import { SessionStatus } from "internet-friends";

let value: SessionStatus = {
  status: "valid",
  userId: "cea9c03f-6ea9-4c3a-a010-0c3344906514",
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `status`                                                       | [models.SessionStatusStatus](../models/sessionstatusstatus.md) | :heavy_check_mark:                                             | Session status                                                 |
| `userId`                                                       | *string*                                                       | :heavy_check_mark:                                             | User ID associated with the session                            |