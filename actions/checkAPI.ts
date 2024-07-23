'use server'

import currentRole from "../lib/currentRole";
import {UserRole} from ".prisma/client";

const CheckApi = async () => {
    const role = await currentRole()

    if (role === UserRole.ADMIN) return {success: 'User is allowed to see this API!'}
    if (role === UserRole.USER) return {error: 'User is not allowed to see this API!'}
};

export default CheckApi;