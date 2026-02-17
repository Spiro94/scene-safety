import { useQuery } from '@tanstack/react-query';
import { signUp } from '../api/supabase';

export function useSignUp(email: string, password: string) {
  return useQuery({
    queryKey: ['signup'],
    queryFn: () => signUp(email, password),
  });
}
