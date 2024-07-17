import {auth, signOut} from "../../../auth";
import {Button} from "../../../components/ui/button";
import {TypographyP} from "../../../components/ui/typographyP";

async function SettingsPage() {
    const session = await auth()

    return <>
        <TypographyP>{JSON.stringify(session)}</TypographyP>
        <form action={async () => {
            "use server"
            await signOut({redirectTo: '/login'})
        }}>
            <Button type={'submit'}>Sign Out</Button>
        </form>
    </>
}

export default SettingsPage;