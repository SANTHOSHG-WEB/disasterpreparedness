-- Add college_name column to profiles table for admin users
ALTER TABLE public.profiles ADD COLUMN college_name TEXT;

-- Update the handle_new_user function to include college_name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (user_id, full_name, age, birthday, school_name, class_name, college_name)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    CASE 
      WHEN new.raw_user_meta_data ->> 'age' IS NOT NULL 
      THEN (new.raw_user_meta_data ->> 'age')::INTEGER 
      ELSE NULL 
    END,
    CASE 
      WHEN new.raw_user_meta_data ->> 'birthday' IS NOT NULL 
      THEN (new.raw_user_meta_data ->> 'birthday')::DATE 
      ELSE NULL 
    END,
    new.raw_user_meta_data ->> 'school_name',
    new.raw_user_meta_data ->> 'class_name',
    new.raw_user_meta_data ->> 'college_name'
  );
  
  -- Insert into user_roles table with role from metadata or default to student
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, COALESCE(new.raw_user_meta_data ->> 'role', 'student'));
  
  RETURN new;
END;
$$;