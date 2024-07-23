'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../../@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "../../@/components/ui/avatar";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import LogoutButton from "./logoutButton";
import {LogOut} from "lucide-react";

function UserButton() {
    const user = useCurrentUser()

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage className={'rounded-full'} src={user?.image || ''} alt="@shadcn"/>
                    <AvatarFallback className={'bg-sky-200'}>OS</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'w-40 bg-white p-2'} align={"end"}>
                <LogoutButton>
                    <DropdownMenuItem><LogOut size={15} className={'mr-2'}/>Logout</DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}

export default UserButton;