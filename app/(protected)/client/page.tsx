'use client'

import UserInfo from "../../../components/userInfo";
import {useCurrentUser} from "../../../hooks/useCurrentUser";

 function ClientPage() {
    const user = useCurrentUser()

    return <>
<UserInfo lable={'🖥️ Client side component'} user={user}/>
    </>
}

export default ClientPage;