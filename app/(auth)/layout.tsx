import {ReactNode} from "react";

function AuthLayout({children}: {children: ReactNode}) {
    return <>
        <main className={'flex h-full justify-center items-center background'}>{children}</main>
    </>
}

export default AuthLayout;