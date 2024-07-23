'use client'

import {Button} from "../../../components/ui/button";
import {usePathname} from "next/navigation";
import Link from "next/link";
import UserButton from "../../../components/auth/userButton";

function Navbar() {
    const pathname = usePathname()

    return <>
        <div className={'bg-secondary flex justify-between items-center rounded-md p-4 w-[600px]'}>
            <div className={'gap-x-2 flex '}>
                <Button size={'sm'} asChild variant={pathname === '/settings' ? 'default' : 'outline'}>
                    <Link href={'/settings'}>Settings</Link>
                </Button>
                 <Button size={'sm'} asChild variant={pathname === '/server' ? 'default' : 'outline'}>
                    <Link href={'/server'}>Server</Link>
                </Button>
                <Button size={'sm'} asChild variant={pathname === '/client' ? 'default' : 'outline'}>
                    <Link href={'/client'}>Client</Link>
                </Button>
                <Button size={'sm'} asChild variant={pathname === '/admin' ? 'default' : 'outline'}>
                    <Link href={'/admin'}>Admin</Link>
                </Button>
            </div>
            <UserButton/>
        </div>
    </>
}

export default Navbar;