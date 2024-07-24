'use client'

import {useRouter} from "next/navigation";
import {ReactNode} from "react";
import LoginForm from "./loginForm";
import {Button} from "../ui/button";
import {Dialog, DialogContent, DialogTrigger} from "../ui/dialog";

interface LoginButtonProps {
    children: ReactNode
    mode?: 'modal' | 'redirect'
    asChild?: boolean
}

function LoginButton({children, asChild, mode = 'redirect'}:LoginButtonProps) {
    const router = useRouter()
    const onClick = () => router.push('/login')

    if (mode === 'modal') {
        return <Dialog>
             <DialogTrigger>
                 <Button>
                      Sign in
                 </Button>
             </DialogTrigger>
            <DialogContent className={'p-0 bg-transparent border-none w-auto'}>
                <LoginForm/>
            </DialogContent>
        </Dialog>
    }

    return <>
    <span onClick={onClick} className={'cursor-pointer'}>
        {children}
    </span>
    </>
}

export default LoginButton;