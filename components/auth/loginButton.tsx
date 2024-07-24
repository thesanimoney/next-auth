'use client'

import {useRouter} from "next/navigation";
import {ReactNode} from "react";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "../ui/dialog";
import LoginForm from "./loginForm";
import {Button} from "../ui/button";

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
                {/*<DialogTitle className={'text-zinc-100'}>*/}
                {/*    Choose suitable option for login.*/}
                {/*</DialogTitle>*/}
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