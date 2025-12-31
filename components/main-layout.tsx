import { Footer } from "./footer"

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (<div className="flex items-start w-full">
        <div className="flex-1">
            <div style={{
                "--sidebar-width": "16rem",
                "--sidebar-width-icon": "3rem"
            } as any} className="group/sidebar-wrapper has-[[data-variant=inset]]:bg-sidebar flex min-h-svh w-full">
                {children}
            </div>
            <Footer />
        </div>
    </div>
    )
}
