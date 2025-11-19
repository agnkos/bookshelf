import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router/dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { router } from "./routes/routes.tsx"
import { refreshAccessToken, getCurrentUser } from "./features/auth/api/auth"
import { setAccessToken } from "./lib/axios"

import "./styles/global.css"

const queryClient = new QueryClient()

async function bootstrapAuth() {
  try {
    const token = await refreshAccessToken()
    if (token) {
      setAccessToken(token)

      await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        retry: false,
      })
    }
  } catch (err) {
    console.log("err", err)
  }
}

;(async () => {
  await bootstrapAuth()
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  )
})()
