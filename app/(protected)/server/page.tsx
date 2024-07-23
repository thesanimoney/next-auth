'use server'
import {auth} from "../../../auth";
import UserInfo from "../../../components/userInfo";

async function ServerPage() {
    const session = await auth()

    return <>
<UserInfo lable={'💻 Server side component'} user={session?.user}/>
    </>
}

export default ServerPage;