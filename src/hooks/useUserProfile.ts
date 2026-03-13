import { useQuery } from '@tanstack/react-query';
import { getSpecificUserProfile } from '../api/supabase';

function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getSpecificUserProfile(userId),
    enabled: !!userId,
  });
}

export default useUserProfile;
