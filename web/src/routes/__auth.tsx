import { Outlet, createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useAuth } from "../auth";
import { Link } from "lucide-react";
import { AuthContext } from "../auth";
import Navbar from "../components/Navbar";

export const Route = createFileRoute('/__auth')({
    beforeLoad: async ({ context, location }) => {
      console.log(context)
        if (!context.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href
                }
            })
        }
    },
    component: AuthLayout
})

function AuthLayout() {
    const router = useRouter()
    const navigate = Route.useNavigate()
    const auth = useAuth()

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
        auth.logout().then(() => {
            router.invalidate().finally(() => {
            navigate({ to: '/' })
            })
        })
        }
    }

    return (
        <>
          <Navbar logout={handleLogout} />
          <div className="mx-auto p-2 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </>
      )
}