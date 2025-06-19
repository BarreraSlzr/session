import { validateRequestSafe } from '@/app/(auth)/lib/schemas/validation';
import { ErrorSchema, FailedSchema, PasskeyAuthenticationOptionsSchema, PasskeyVerificationResponseSchema, PasskeyVerificationSuccessSchema, SessionDestroySchema, SessionRenewSchema, SessionStatusSchema, SuccessSchema, UserRegistrationSchema, UserSchema, UserValidationSchema } from '@/app/(auth)/lib/schemas/zod/validation';

// Simple test runner for schemas
function runTests() {
  const tests = [
    // Session Schemas
    {
      name: 'SessionStatusSchema validates correct data',
      test: () => {
        const validData = { status: 'valid', userId: '123' };
        const result = validateRequestSafe(SessionStatusSchema, validData);
        if (!result.success) throw new Error('Expected validation to succeed');
        if (result.data.status !== 'valid') throw new Error('Expected status to be valid');
        return true;
      }
    },
    {
      name: 'SessionStatusSchema rejects invalid status',
      test: () => {
        const invalidData = { status: 'invalid', userId: '123' };
        const result = validateRequestSafe(SessionStatusSchema, invalidData);
        if (result.success) throw new Error('Expected validation to fail');
        return true;
      }
    },
    {
      name: 'SessionRenewSchema validates correct data',
      test: () => {
        const validData = { token: 'new-session-token' };
        const result = validateRequestSafe(SessionRenewSchema, validData);
        if (!result.success) throw new Error('Expected validation to succeed');
        return true;
      }
    },
    {
      name: 'SessionDestroySchema validates correct data',
      test: () => {
        const validData = { message: 'Session destroyed successfully' };
        const result = validateRequestSafe(SessionDestroySchema, validData);
        if (!result.success) throw new Error('Expected validation to succeed');
        return true;
      }
    },
    // Passkey Schemas
    {
      name: 'PasskeyAuthenticationOptionsSchema validates correct data',
      test: () => {
        const validData = {
          challenge: 'base64-challenge',
          timeout: 60000,
          rpId: 'internetfriends.com',
          userVerification: 'preferred',
        };
        const result = validateRequestSafe(PasskeyAuthenticationOptionsSchema, validData);
        if (!result.success) throw new Error('Expected validation to succeed');
        return true;
      }
    },
    {
      name: 'PasskeyVerificationResponseSchema validates correct data',
      test: () => {
        const validData = { response: '{"id":"credential-id","response":{"clientDataJSON":"..."}}' };
        const result = validateRequestSafe(PasskeyVerificationResponseSchema, validData);
        if (!result.success) throw new Error('Expected validation to succeed');
        return true;
      }
    },
    {
      name: 'PasskeyVerificationSuccessSchema validates correct data',
      test: () => {
        const validData = { status: 'success' };
        const result = validateRequestSafe(PasskeyVerificationSuccessSchema, validData);
        if (!result.success) throw new Error('Expected validation to succeed');
        return true;
      }
    },
    // User Schemas
    {
      name: 'UserSchema validates correct data',
      test: () => {
        const validData = {
          id: 'user-id',
          email: 'user@example.com',
          name: 'User Name',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        };
        const result = validateRequestSafe(UserSchema, validData);
        if (!result.success) throw new Error('Expected validation to succeed');
        return true;
      }
    },
    {
      name: 'UserSchema validates data without optional name',
      test: () => {
        const validData = {
          id: 'user-id',
          email: 'user@example.com',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        };
        const result = validateRequestSafe(UserSchema, validData);
        if (!result.success) throw new Error('Expected validation to succeed');
        return true;
      }
    },
    {
      name: 'UserSchema rejects invalid email',
      test: () => {
        const invalidData = {
          id: 'user-id',
          email: 'invalid-email',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        };
        const result = validateRequestSafe(UserSchema, invalidData);
        if (result.success) throw new Error('Expected validation to fail');
        return true;
      }
    },
    // Form Schemas
    {
      name: 'LoginFormSchema validates correct data',
      test: () => {
        const validData = {
          email: 'user@example.com',
          password: 'password123',
        };
        const result = validateRequestSafe(UserValidationSchema, validData);
        if (!result.success) throw new Error('Expected validation to succeed');
        return true;
      }
    },
    {
      name: 'LoginFormSchema rejects empty password',
      test: () => {
        const invalidData = {
          email: 'user@example.com',
          password: '',
        };
        const result = validateRequestSafe(UserValidationSchema, invalidData);
        if (result.success) throw new Error('Expected validation to fail');
        return true;
      }
    },
    {
      name: 'RegisterFormSchema validates correct data',
      test: () => {
        const validData = {
          email: 'user@example.com',
          name: 'User Name',
        };
        const result = validateRequestSafe(UserRegistrationSchema, validData);
        if (!result.success) throw new Error('Expected validation to succeed');
        return true;
      }
    },
    // Base Schemas
    {
      name: 'ErrorSchema validates correct data',
      test: () => {
        const validData = {
          error: 'Something went wrong',
        };
        const result = validateRequestSafe(ErrorSchema, validData);
        if (!result.success) throw new Error('Expected validation to succeed');
        return true;
      }
    },
    {
      name: 'SuccessSchema validates correct data',
      test: () => {
        const validData = {
          status: 'success',
        };
        const result = validateRequestSafe(SuccessSchema, validData);
        if (!result.success) throw new Error('Expected validation to succeed');
        return true;
      }
    },
    {
      name: 'FailedSchema validates correct data',
      test: () => {
        const validData = {
          status: 'failed',
        };
        const result = validateRequestSafe(FailedSchema, validData);
        if (!result.success) throw new Error('Expected validation to succeed');
        return true;
      }
    },
  ];

  let passed = 0;
  let failed = 0;

  console.log('Running Zod Schema Tests...\n');

  tests.forEach(({ name, test }) => {
    try {
      test();
      console.log(`✅ ${name}`);
      passed++;
    } catch (error) {
      console.error(`❌ ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      failed++;
    }
  });

  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

export { runTests }; 