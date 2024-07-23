'use client'

import {Card, CardContent, CardHeader} from "../../../components/ui/card";
import {TypographyH2} from "../../../components/ui/typographyH2";
import RoleGates from "../../../components/auth/roleGates";
import FormSuccess from "../../../components/formSuccess";
import {Button} from "../../../components/ui/button";
import {useCurrentRole} from "../../../hooks/useCurrentRole";
import {toast} from "sonner";
import checkAPI from "../../../actions/checkAPI";

function AdminPage() {
    const role = useCurrentRole()
    const onApiRoutelick = () => {
         fetch('/api/admin').then(res => {
            if (res.ok) toast.success('Allowed API route!')
             else toast.error('Not allowed API route!')
        }).catch(err => toast.error('Not allowed API route!'))
    }

       const onApiActionlick = () => {
        checkAPI().then(res => {
            if (res.success) return toast.success(res.success)
            if (res.error) return toast.error(res.error)
        })
    }

    return <>
       <Card className={'w-[600px] flex justify-center items-center flex-col'}>
          <CardHeader>
               <TypographyH2 title={'🔑 Admin'}/>
          </CardHeader>
           <CardContent>
               <RoleGates role={role} allowedRole={'ADMIN'}>
                   <FormSuccess message={'You are allowed to see this message!'}/>
               </RoleGates>
               <div
                   className={'flex mt-2 flex-row rounded-md justify-between items-center w-[550px] border p-3 shadow-sm'}>
                   <p className={'text-sm font-medium'}>API Route</p>
                   <Button onClick={onApiRoutelick}>Test API Route</Button>
               </div>
               <div
                   className={'flex mt-2 flex-row rounded-md justify-between items-center w-[550px] border p-3 shadow-sm'}>
                   <p className={'text-sm font-medium'}>API Action</p>
                   <Button onClick={onApiActionlick}>Test Server Action</Button>
               </div>
           </CardContent>
       </Card>
    </>
}

export default AdminPage;