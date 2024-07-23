import {auth} from "../auth";

const CurrentRole = async () => {
    const session = await auth()
    return session?.user?.role
};

export default CurrentRole;