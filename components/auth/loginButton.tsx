'use client'

import {useRouter} from "next/navigation";
import {ReactNode} from "react";

interface LoginButtonProps {
    children: ReactNode
    mode?: 'modal' | 'redirect'
    asChild?: boolean
}

function LoginButton({children, asChild, mode = 'redirect'}:LoginButtonProps) {
    const router = useRouter()
    const onClick = () => router.push('/login')

    return <>
    <span onClick={onClick} className={'cursor-pointer'}>
        {children}
    </span>
    </>
}

export default LoginButton;