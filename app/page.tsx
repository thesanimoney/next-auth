import {TypographyH1} from "../components/ui/typographyH1";
import {TypographyP} from "../components/ui/typographyP";
import LoginButton from "../components/auth/loginButton";
import { Button } from "../components/ui/button";


export default function Home() {
    return <>
        <main
            className={'flex text-white space-y-6 items-center h-full justify-center flex-col background'}>
            <TypographyH1>🔐Auth</TypographyH1>
            <TypographyP>Simple authentication service for learning.</TypographyP>
            <LoginButton mode={'modal'} asChild>
                <Button size='lg'>Sign In</Button>
            </LoginButton>
        </main>
    </>
}