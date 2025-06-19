<!-- Start SDK Example Usage [usage] -->
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