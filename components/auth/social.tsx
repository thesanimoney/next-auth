"use client"

import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {Button} from "../ui/button";
import {signIn} from "next-auth/react";
import {DEFAULT_LOGIN_REDIRECT} from "../../routes";
function Social() {
    const onClick = (provider: 'google' | 'github') => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    return <>
        <div className={'flex gap-x-2 w-full items-center'}>
            <Button onClick={() => onClick('google')} variant={'outline'}>
                <FcGoogle className={'mr-2'}/> Sign in with Google
            </Button>
                <Button onClick={() => onClick('github')}>
                <FaGithub className={'mr-2'}/> Sign in with Github
            </Button>
        </div>
    </>
}

export default Social;