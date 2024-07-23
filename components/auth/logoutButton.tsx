import {ReactNode} from "react";
import {signOut} from "next-auth/react";

function LogoutButton({children}: {children: ReactNode}) {
    const onClick = () => {
        signOut()
    }

    return <>
        <span className={'cursor-pointer outline-none'} onClick={onClick}>{children}</span>
        </>
}

export default LogoutButton;