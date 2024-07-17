import {ReactNode} from "react";

function SettingsLayout({children}: {children: ReactNode}) {
    return <>
        <main className={'flex h-full justify-center flex-col space-y-6 items-center background'}>{children}</main>
    </>
}

export default SettingsLayout;