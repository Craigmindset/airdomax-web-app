import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { ProfileProvider } from "@/contexts/ProfileContext"
import { WalletProvider } from "@/contexts/WalletContext"
import { ProductServiceProvider } from "@/contexts/ProductServiceContext"
import { UserProvider } from "@/contexts/UserContext"
import ErrorBoundary from "@/components/error-boundary"

const DynamicDashboardLayout = dynamic(() => import('@/components/dashboard/layout'), {
  loading: () => <p>Loading...</p>,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <UserProvider>
        <ProfileProvider>
          <WalletProvider>
            <ProductServiceProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <DynamicDashboardLayout>{children}</DynamicDashboardLayout>
              </Suspense>
            </ProductServiceProvider>
          </WalletProvider>
        </ProfileProvider>
      </UserProvider>
    </ErrorBoundary>
  )
}

