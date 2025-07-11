/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { sessionsDestroy } from "../../funcs/sessionsDestroy.js";
import { formatResult, ToolDefinition } from "../tools.js";

export const tool$sessionsDestroy: ToolDefinition = {
  name: "sessions-destroy",
  description: `Destroy session

Invalidates the current session and logs the user out`,
  tool: async (client, ctx) => {
    const [result, apiCall] = await sessionsDestroy(
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
