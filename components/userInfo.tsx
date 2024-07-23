import {ExtendedUser} from "../next-auth";
import {Card, CardContent, CardHeader} from "./ui/card";
import {TypographyH2} from "./ui/typographyH2";

interface Props {
    user?: ExtendedUser
    lable: string
}

function UserInfo({user, lable}: Props) {
    return <>
        <Card className={'w-[600px] shadow-md'}>
            <CardHeader className={'text-center'}>
                <TypographyH2 title={lable}/>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <div className={'flex flex-row rounded-md justify-between items-center border p-3 shadow-sm'}>
                    <p className={'text-sm font-medium'}>ID:</p>
                    <p className={'text-xs truncate max-w-[150px] bg-slate-100 rounded-sm px-2'}>{user?.id}</p>
                </div>
                <div className={'flex flex-row rounded-md justify-between items-center border p-3 shadow-sm'}>
                    <p className={'text-sm font-medium'}>Name:</p>
                    <p className={'text-xs truncate max-w-[150px] bg-slate-100 rounded-sm px-2'}>{user?.name}</p>
                </div>
                <div className={'flex flex-row rounded-md justify-between items-center border p-3 shadow-sm'}>
                    <p className={'text-sm font-medium'}>Role:</p>
                    <p className={'text-xs truncate max-w-[150px] bg-slate-100 rounded-sm px-2'}>{user?.role}</p>
                </div>
                {user?.email &&
                    <div className={'flex flex-row rounded-md justify-between items-center border p-3 shadow-sm'}>
                        <p className={'text-sm font-medium'}>Email:</p>
                        <p className={'text-xs truncate max-w-[150px] bg-slate-100 rounded-sm px-2'}>{user?.email}</p>
                    </div>}
                {user?.image &&
                    <div className={'flex flex-row rounded-md justify-between items-center border p-3 shadow-sm'}>
                        <p className={'text-sm font-medium'}>Image:</p>
                        <p className={'text-xs truncate max-w-[150px] bg-slate-100 rounded-sm px-2'}>{user?.image}</p>
                    </div>}
                <div className={'flex flex-row rounded-md justify-between items-center border p-3 shadow-sm'}>
                    <p className={'text-sm font-medium'}>2FA:</p>
                    <p className={'text-xs truncate max-w-[150px] bg-slate-100 rounded-sm px-2'}>{!user?.isTwoFactorEnabled ? 'Disabled' : 'Enabled'}</p>
                </div>
            </CardContent>
        </Card>
    </>
}

export default UserInfo;