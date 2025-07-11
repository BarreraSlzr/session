/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";

export type Rp = {
  /**
   * Relying party name
   */
  name: string;
  /**
   * Relying party ID
   */
  id: string;
};

export type User = {
  /**
   * User ID
   */
  id: string;
  /**
   * Username
   */
  name: string;
  /**
   * Display name
   */
  displayName: string;
};

export type PubKeyCredParam = {
  /**
   * Credential type
   */
  type?: string | undefined;
  /**
   * Algorithm identifier
   */
  alg?: number | undefined;
};

export type AuthenticatorSelection = {
  /**
   * Authenticator attachment preference
   */
  authenticatorAttachment: string;
  /**
   * Whether resident key is required
   */
  requireResidentKey: boolean;
  /**
   * User verification requirement
   */
  userVerification: string;
};

export type PasskeyRegistrationOptions = {
  /**
   * Base64-encoded challenge
   */
  challenge: string;
  /**
   * Timeout in milliseconds
   */
  timeout: number;
  rp: Rp;
  user: User;
  pubKeyCredParams: Array<PubKeyCredParam>;
  authenticatorSelection: AuthenticatorSelection;
  /**
   * Attestation conveyance preference
   */
  attestation: string;
};

/** @internal */
export const Rp$inboundSchema: z.ZodType<Rp, z.ZodTypeDef, unknown> = z.object({
  name: z.string(),
  id: z.string(),
});

/** @internal */
export type Rp$Outbound = {
  name: string;
  id: string;
};

/** @internal */
export const Rp$outboundSchema: z.ZodType<Rp$Outbound, z.ZodTypeDef, Rp> = z
  .object({
    name: z.string(),
    id: z.string(),
  });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Rp$ {
  /** @deprecated use `Rp$inboundSchema` instead. */
  export const inboundSchema = Rp$inboundSchema;
  /** @deprecated use `Rp$outboundSchema` instead. */
  export const outboundSchema = Rp$outboundSchema;
  /** @deprecated use `Rp$Outbound` instead. */
  export type Outbound = Rp$Outbound;
}

export function rpToJSON(rp: Rp): string {
  return JSON.stringify(Rp$outboundSchema.parse(rp));
}

export function rpFromJSON(
  jsonString: string,
): SafeParseResult<Rp, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Rp$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Rp' from JSON`,
  );
}

/** @internal */
export const User$inboundSchema: z.ZodType<User, z.ZodTypeDef, unknown> = z
  .object({
    id: z.string(),
    name: z.string(),
    displayName: z.string(),
  });

/** @internal */
export type User$Outbound = {
  id: string;
  name: string;
  displayName: string;
};

/** @internal */
export const User$outboundSchema: z.ZodType<User$Outbound, z.ZodTypeDef, User> =
  z.object({
    id: z.string(),
    name: z.string(),
    displayName: z.string(),
  });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace User$ {
  /** @deprecated use `User$inboundSchema` instead. */
  export const inboundSchema = User$inboundSchema;
  /** @deprecated use `User$outboundSchema` instead. */
  export const outboundSchema = User$outboundSchema;
  /** @deprecated use `User$Outbound` instead. */
  export type Outbound = User$Outbound;
}

export function userToJSON(user: User): string {
  return JSON.stringify(User$outboundSchema.parse(user));
}

export function userFromJSON(
  jsonString: string,
): SafeParseResult<User, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => User$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'User' from JSON`,
  );
}

/** @internal */
export const PubKeyCredParam$inboundSchema: z.ZodType<
  PubKeyCredParam,
  z.ZodTypeDef,
  unknown
> = z.object({
  type: z.string().optional(),
  alg: z.number().int().optional(),
});

/** @internal */
export type PubKeyCredParam$Outbound = {
  type?: string | undefined;
  alg?: number | undefined;
};

/** @internal */
export const PubKeyCredParam$outboundSchema: z.ZodType<
  PubKeyCredParam$Outbound,
  z.ZodTypeDef,
  PubKeyCredParam
> = z.object({
  type: z.string().optional(),
  alg: z.number().int().optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PubKeyCredParam$ {
  /** @deprecated use `PubKeyCredParam$inboundSchema` instead. */
  export const inboundSchema = PubKeyCredParam$inboundSchema;
  /** @deprecated use `PubKeyCredParam$outboundSchema` instead. */
  export const outboundSchema = PubKeyCredParam$outboundSchema;
  /** @deprecated use `PubKeyCredParam$Outbound` instead. */
  export type Outbound = PubKeyCredParam$Outbound;
}

export function pubKeyCredParamToJSON(
  pubKeyCredParam: PubKeyCredParam,
): string {
  return JSON.stringify(PubKeyCredParam$outboundSchema.parse(pubKeyCredParam));
}

export function pubKeyCredParamFromJSON(
  jsonString: string,
): SafeParseResult<PubKeyCredParam, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PubKeyCredParam$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PubKeyCredParam' from JSON`,
  );
}

/** @internal */
export const AuthenticatorSelection$inboundSchema: z.ZodType<
  AuthenticatorSelection,
  z.ZodTypeDef,
  unknown
> = z.object({
  authenticatorAttachment: z.string(),
  requireResidentKey: z.boolean(),
  userVerification: z.string(),
});

/** @internal */
export type AuthenticatorSelection$Outbound = {
  authenticatorAttachment: string;
  requireResidentKey: boolean;
  userVerification: string;
};

/** @internal */
export const AuthenticatorSelection$outboundSchema: z.ZodType<
  AuthenticatorSelection$Outbound,
  z.ZodTypeDef,
  AuthenticatorSelection
> = z.object({
  authenticatorAttachment: z.string(),
  requireResidentKey: z.boolean(),
  userVerification: z.string(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace AuthenticatorSelection$ {
  /** @deprecated use `AuthenticatorSelection$inboundSchema` instead. */
  export const inboundSchema = AuthenticatorSelection$inboundSchema;
  /** @deprecated use `AuthenticatorSelection$outboundSchema` instead. */
  export const outboundSchema = AuthenticatorSelection$outboundSchema;
  /** @deprecated use `AuthenticatorSelection$Outbound` instead. */
  export type Outbound = AuthenticatorSelection$Outbound;
}

export function authenticatorSelectionToJSON(
  authenticatorSelection: AuthenticatorSelection,
): string {
  return JSON.stringify(
    AuthenticatorSelection$outboundSchema.parse(authenticatorSelection),
  );
}

export function authenticatorSelectionFromJSON(
  jsonString: string,
): SafeParseResult<AuthenticatorSelection, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AuthenticatorSelection$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AuthenticatorSelection' from JSON`,
  );
}

/** @internal */
export const PasskeyRegistrationOptions$inboundSchema: z.ZodType<
  PasskeyRegistrationOptions,
  z.ZodTypeDef,
  unknown
> = z.object({
  challenge: z.string(),
  timeout: z.number().int(),
  rp: z.lazy(() => Rp$inboundSchema),
  user: z.lazy(() => User$inboundSchema),
  pubKeyCredParams: z.array(z.lazy(() => PubKeyCredParam$inboundSchema)),
  authenticatorSelection: z.lazy(() => AuthenticatorSelection$inboundSchema),
  attestation: z.string(),
});

/** @internal */
export type PasskeyRegistrationOptions$Outbound = {
  challenge: string;
  timeout: number;
  rp: Rp$Outbound;
  user: User$Outbound;
  pubKeyCredParams: Array<PubKeyCredParam$Outbound>;
  authenticatorSelection: AuthenticatorSelection$Outbound;
  attestation: string;
};

/** @internal */
export const PasskeyRegistrationOptions$outboundSchema: z.ZodType<
  PasskeyRegistrationOptions$Outbound,
  z.ZodTypeDef,
  PasskeyRegistrationOptions
> = z.object({
  challenge: z.string(),
  timeout: z.number().int(),
  rp: z.lazy(() => Rp$outboundSchema),
  user: z.lazy(() => User$outboundSchema),
  pubKeyCredParams: z.array(z.lazy(() => PubKeyCredParam$outboundSchema)),
  authenticatorSelection: z.lazy(() => AuthenticatorSelection$outboundSchema),
  attestation: z.string(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PasskeyRegistrationOptions$ {
  /** @deprecated use `PasskeyRegistrationOptions$inboundSchema` instead. */
  export const inboundSchema = PasskeyRegistrationOptions$inboundSchema;
  /** @deprecated use `PasskeyRegistrationOptions$outboundSchema` instead. */
  export const outboundSchema = PasskeyRegistrationOptions$outboundSchema;
  /** @deprecated use `PasskeyRegistrationOptions$Outbound` instead. */
  export type Outbound = PasskeyRegistrationOptions$Outbound;
}

export function passkeyRegistrationOptionsToJSON(
  passkeyRegistrationOptions: PasskeyRegistrationOptions,
): string {
  return JSON.stringify(
    PasskeyRegistrationOptions$outboundSchema.parse(passkeyRegistrationOptions),
  );
}

export function passkeyRegistrationOptionsFromJSON(
  jsonString: string,
): SafeParseResult<PasskeyRegistrationOptions, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PasskeyRegistrationOptions$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PasskeyRegistrationOptions' from JSON`,
  );
}
