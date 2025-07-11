/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { passkeysGetGenerateRegisterOptions } from "../../funcs/passkeysGetGenerateRegisterOptions.js";
import { formatResult, ToolDefinition } from "../tools.js";

export const tool$passkeysGetGenerateRegisterOptions: ToolDefinition = {
  name: "passkeys-get-generate-register-options",
  description: `Generate registration options for passkey

Generates WebAuthn registration options for creating a new passkey`,
  tool: async (client, ctx) => {
    const [result, apiCall] = await passkeysGetGenerateRegisterOptions(
      client,
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
