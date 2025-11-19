import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCurrentUser, login, logout } from "../api/auth"
import { setAccessToken } from "../../../lib/axios"

export const useAuth = () => {
  const queryClient = useQueryClient()

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
    enabled: false,
  })

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    // onSuccess: (user) => queryClient.setQueryData(["user"], user),
    onSuccess: (data) => {
      const accessToken: string = data?.accessToken ?? null
      setAccessToken(accessToken)
      userQuery.refetch()
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.removeQueries({ queryKey: ["user"] }),
  })

  const refetchUser = () => {
    // change refetch to setQueryData?
    userQuery.refetch()
  }

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    refetchUser,
  }
}
