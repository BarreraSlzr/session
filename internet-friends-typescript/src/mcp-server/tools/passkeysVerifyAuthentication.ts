/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { passkeysVerifyAuthentication } from "../../funcs/passkeysVerifyAuthentication.js";
import * as models from "../../models/index.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: models.PasskeyVerificationRequest$inboundSchema,
};

export const tool$passkeysVerifyAuthentication: ToolDefinition<typeof args> = {
  name: "passkeys-verify-authentication",
  description: `Verify passkey authentication response

Verifies a WebAuthn authentication response from the client`,
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await passkeysVerifyAuthentication(
      client,
      args.request,
      { fetchOptions: { signal: ctx.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: result.error.message }],
        isError: true,
      };
    }

    const value = result.value;

    return formatResult(value, apiCall);
  },
};
