import { AuthMethod } from "./db/types";
import { createError } from "./errors";

// Legacy error message mapping for backward compatibility
export const errorMessages = {
    'Token expired': 'Your token has expired.',
    'Token already verified': 'Your token has already been verified.',
    'Token error': 'Invalid token.',
    'Token is required': 'Token is required.'
};

export async function handleAuthMethodValidation(authMethod: AuthMethod | undefined) {
    if (!authMethod) {
        throw createError.auth.methodNotFound();
    }
    if (isExpired(authMethod.expiresAt)) {
        throw createError.auth.methodExpired();
    }
    if (authMethod.verifiedAt) {
        throw createError.auth.methodAlreadyVerified();
    }
    return authMethod as AuthMethod;
}

export function isExpired(date: Date | undefined): boolean {
    return !!date && new Date(date) < new Date();
}