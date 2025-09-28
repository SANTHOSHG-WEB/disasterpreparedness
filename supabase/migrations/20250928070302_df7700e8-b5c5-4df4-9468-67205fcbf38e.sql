-- Update all existing users to be email confirmed
-- This will fix the "email not confirmed" error for users who signed up before disabling email confirmation
UPDATE auth.users 
SET email_confirmed_at = now()
WHERE email_confirmed_at IS NULL;