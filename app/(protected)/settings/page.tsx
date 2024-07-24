'use client'

import {Card, CardContent, CardHeader} from "../../../components/ui/card";
import {TypographyH2} from "../../../components/ui/typographyH2";
import {Button} from "../../../components/ui/button";
import settings from "../../../actions/settings";
import {useState, useTransition} from "react";
import {BeatLoader} from "react-spinners";
import {toast} from "sonner";
import {useSession} from "next-auth/react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {settingsSchema} from "../../../schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem, FormLabel,
    FormMessage
} from "../../../components/ui/form";
import {Input} from "../../../components/ui/input";
import {UserRole} from ".prisma/client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue
} from "../../../components/ui/select";
import FormError from "../../../components/formError";
import FormSuccess from "../../../components/formSuccess";
import {Switch} from "../../../components/switch";

function SettingsPage() {
    const [isPending, startTransition] = useTransition()
    const {update, data} = useSession()
    const [error, setError] = useState<string>()
    const [success, setSuccess] = useState<string>()

    const user = data?.user

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
            role: user?.role || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined
        }
    })

    if (!user) return window.location.reload()

    const onSettingsChange = (values: z.infer<typeof settingsSchema>) => {
        startTransition(() => {
            settings({...values}).then(res => {
                if (res.success) {
                    setSuccess(res.success)
                    update()
                } else if (res.error) setError(res.error)

            }).catch(() => toast.error("Something went wrong..."))
        })
        setTimeout(() => {
            setSuccess('')
            setError('')
        }, 5000)
    }

    return <>
        <Card className={'w-[600px] flex justify-center items-center flex-col'}>
            <CardHeader>
                <TypographyH2 title={'⚙️ Settings'}/>
            </CardHeader>
            <CardContent>
                <div
                    className={'flex mt-2 flex-row rounded-md justify-between items-center w-[550px] border p-3 shadow-sm'}>
                    <Form {...form}>
                        <form className={'flex w-full space-y-6 flex-col'}
                              onSubmit={form.handleSubmit(onSettingsChange)}>
                            <FormField
                                control={form.control}
                                name={'name'}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>This is your public display name</FormLabel>
                                        <FormControl>
                                            <Input type={'text'} disabled={isPending} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            {!user.isOauth && <>
                                <FormField
                                    control={form.control}
                                    name={'email'}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type={'email'} disabled={isPending} {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name={'password'}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder={'******'} type={'password'}
                                                       disabled={isPending} {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name={'newPassword'}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>New password</FormLabel>
                                            <FormControl>
                                                <Input placeholder={'******'} type={'password'}
                                                       disabled={isPending} {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                            </>}
                            <FormField
                                control={form.control}
                                name={'role'}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select disabled={isPending}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={'Select a role'}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className={'w-full'}>
                                                <SelectGroup className={'w-full'}>
                                                    <SelectLabel>Choose role:</SelectLabel>
                                                    <SelectItem className={'w-full'}
                                                                value={UserRole.ADMIN}>Admin</SelectItem>
                                                    <SelectItem value={UserRole.USER}>User</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}/>
                            {!user.isOauth && <FormField
                                control={form.control}
                                name={'isTwoFactorEnabled'}
                                render={({field}) => (
                                    <FormItem
                                        className={'flex border flex-row p-3 shadow-sm rounded-md w-full items-center justify-between'}>
                                        <div className={'space-y-0.5'}>
                                            <FormLabel>2FA</FormLabel>
                                            <FormDescription>Enable your 2FA authentication</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch disabled={isPending} checked={field.value}
                                                    onCheckedChange={field.onChange}/>
                                        </FormControl>
                                    </FormItem>
                                )}/>}
                            <FormError message={error}/>
                            <FormSuccess message={success}/>
                            <Button type={'submit'} className={'max-w-[150px]'} size={'sm'} disabled={isPending}>Save
                                {isPending && <BeatLoader size={7} color={'white'} className={'ml-2'}/>}
                            </Button>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    </>
}

export default SettingsPage;