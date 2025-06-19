# API Overview

This document summarizes the main API endpoints, their purposes, and the key schemas used in requests and responses. For full details, see [openapi.yaml](../openapi.yaml).

## Main Endpoints

### Passkey Authentication
- **GET /passkey/generate-authenticate-options**
  - Generate authentication options for passkey login
  - Response: `PasskeyAuthenticationOptions`
- **GET /passkey/generate-register-options**
  - Generate registration options for passkey
  - Response: `PasskeyRegistrationOptions`
- **POST /passkey/verify-authentication**
  - Verify passkey authentication response
  - Request: `PasskeyVerificationRequest`
  - Response: `PasskeyVerificationSuccess` or `Error`
- **POST /passkey/verify-registration**
  - Verify passkey registration response
  - Request: `PasskeyVerificationRequest`
  - Response: `PasskeyRegistrationSuccess` or `Error`

### Session Management
- **GET /session/status**
  - Check session status
  - Response: `SessionStatus` or `Error`
- **POST /session/renew**
  - Renew session
  - Response: `SessionRenew` or `Error`
- **POST /session/destroy**
  - Destroy session
  - Response: `SessionDestroy` or `Error`

## Key Schemas
- **Error:** Standardized error response with code, message, and details
- **SessionStatus, SessionRenew, SessionDestroy:** Session management responses
- **PasskeyAuthenticationOptions, PasskeyRegistrationOptions:** WebAuthn challenge options
- **PasskeyVerificationRequest:** WebAuthn response payload
- **PasskeyVerificationSuccess, PasskeyRegistrationSuccess:** Success responses for passkey flows
- **User, AuthMethod:** User and authentication method objects

## Authentication
- Most endpoints require a valid session cookie (`session`) for authentication.
- Unauthorized or invalid sessions return an `Error` response with a relevant code.

## Error Handling
- All endpoints return consistent error responses with machine-readable codes and human-readable messages.
- See [error-handling.md](./error-handling.md) for more details.

---
For the full API specification, including all request/response schemas and examples, see [openapi.yaml](../openapi.yaml). 