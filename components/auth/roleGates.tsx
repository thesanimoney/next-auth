'use client'

import {ReactNode} from "react";
import {UserRole} from ".prisma/client";
import FormError from "../formError";

interface RoleGates {
    children: ReactNode
    allowedRole: UserRole
    role: UserRole
}

function RoleGates({children, allowedRole, role}:RoleGates) {
    if (role !== allowedRole) return <FormError message={'You do not have permissions to view this content.'}/>

    return <>
        {children}
    </>
}

export default RoleGates;