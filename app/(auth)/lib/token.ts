import { isExpired } from "./db/queries";
import { AuthMethod } from "./db/types";

export const errorMessages = {
    'Token expired': 'Your token has expired.',
    'Token already verified': 'Your token has already been verified.',
    'Token error': 'Invalid token.',
    'Token is required': 'Token is required.'
};

export async function handleAuthMethodValidation(authMethod: AuthMethod | undefined) {
    if (!authMethod) {
        throw new Error('Token error');
    }
    if (isExpired(authMethod.expiresAt)) {
        throw new Error('Token expired');
    }
    if (authMethod.verifiedAt) {
        throw new Error('Token already verified');
    }
    return authMethod as AuthMethod;
}