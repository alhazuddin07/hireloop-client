import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";

const menuItemByRole = {
    seeker: [

    ],
    recruiter: [

    ],
    admin: [

    ]
}

const DashboardSidebar = () => {

    const { data: session, isPending } = useSession();
    const role = (session?.user?.role || 'seeker') as keyof typeof menuItemByRole;

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarMenu>
                        {
                            // menuItemByRole[role].map((item) => (
                            //     <SidebarMenuItem key={item.name}>
                            //         <SidebarMenuButton render={<a href={item.url} />}>
                            //             <item.icon />
                            //             <span>{item.name}</span>
                            //         </SidebarMenuButton>
                            //     </SidebarMenuItem>
                            // ))
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
};

export default DashboardSidebar;