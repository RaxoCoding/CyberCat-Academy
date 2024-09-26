import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabaseAuth } from "./useSupabaseAuth";
import { Database } from "@/types/supabase";
import { UserAttributes } from "@supabase/supabase-js";

type User = Database["public"]["Tables"]["users"]["Row"] & {
  email: string;
};

interface baseSideEffects {
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
  onSettled?: (data: unknown, error: unknown) => void;
}

export function useAuthedUser() {
  const { supabase, user: userAuth } = useSupabaseAuth();
  const queryClient = useQueryClient();

  const fetchUser = async (): Promise<User | null> => {
    if (!userAuth) return null;
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userAuth.id)
      .single();

    if (error) throw new Error("An unknown error occurred.");
    return { ...data, email: userAuth.email! };
  };

  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ["user", userAuth?.id],
    queryFn: fetchUser,
    enabled: !!userAuth,
  });

  interface updaterUserVairables extends baseSideEffects {
    updates: UserAttributes;
    options?: {
      emailRedirectTo?: string | undefined;
    };
  }

  const updateUser = useMutation({
    mutationFn: async ({ updates, options }: updaterUserVairables) => {
      if (!user) throw new Error("No user to update");

      const { data, error } = await supabase.auth.updateUser(updates, options);

      if (error) throw error;
      return data;
    },
    onSuccess: (data, { onSuccess }: updaterUserVairables) => {
      queryClient.invalidateQueries({ queryKey: ["user", userAuth?.id] });
      onSuccess && onSuccess(data);
    },
    onError: (error, { onError }: updaterUserVairables) => {
      onError && onError(error);
    },
    onSettled: (data, error, { onSettled }: updaterUserVairables) => {
      onSettled && onSettled(data, error);
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: (data, { onSuccess }: baseSideEffects) => {
      queryClient.setQueryData(["user", userAuth?.id], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess && onSuccess(data);
    },
    onError: (error, { onError }: baseSideEffects) => {
      onError && onError(error);
    },
    onSettled: (data, error, { onSettled }: baseSideEffects) => {
      onSettled && onSettled(data, error);
    },
  });

  const deleteUser = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("No user to delete");
      const { error } = await supabase.rpc("delete_user");

      if (error) throw error;
    },
    onSuccess: (data, { onSuccess }: baseSideEffects) => {
      onSuccess && onSuccess(data);
    },
    onError: (error, { onError }: baseSideEffects) => {
      onError && onError(error);
    },
    onSettled: (data, error, { onSettled }: baseSideEffects) => {
      onSettled && onSettled(data, error);
    },
  });

  return {
    user,
    error,
    isLoading: isLoading,
    updateUser: updateUser.mutate,
    isUpdating: updateUser.isPending,
    logout: logout.mutate,
    isLoggingOut: logout.isPending,
    deleteUser: deleteUser.mutate,
    isDeleting: deleteUser.isPending,
  };
}
