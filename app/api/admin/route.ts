import {NextRequest, NextResponse} from "next/server";
import CurrentRole from "../../../lib/currentRole";
import {UserRole} from ".prisma/client";

export async function GET(request: NextRequest,) {
    const role = await CurrentRole()
    if (role === UserRole.ADMIN) return NextResponse.json({data: 'You are allowed to use this API'},
        {status: 200})

    return NextResponse.json(null, {status: 403})
}

