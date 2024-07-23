import {ReactNode} from "react";
import Navbar from "./_components/navbar";

function SettingsLayout({children}: {children: ReactNode}) {
    return <>
        <main className={'flex h-full justify-center flex-col space-y-6 items-center background'}>
            <Navbar/>
            {children}</main>
    </>
}

export default SettingsLayout;