'use client'

import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {loginSchema} from "../../schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import CardWrapper from "./cardWrapper";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Input} from "../ui/input";
import FormError from "../formError";
import FormSuccess from "../formSuccess";
import {Button} from "../ui/button";
import {login} from "../../actions/login";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {BeatLoader} from "react-spinners";

export interface Response {
    user: {
        password: string,
        email: string
    },
    success: string,
    error: string
}

function LoginForm() {
    const [isPending, startTransition] = useTransition()
    const [twoFactor, setTwoFactor] = useState<boolean>()

    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') == 'OAuthAccountNotLinked' ?
        'Email already registered, please use different signing type.' : searchParams.get('error')

    const [message, setMessage] =
        useState({error: '', success: ''})

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            code: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setMessage({success: '', error: ''})

        startTransition(() => {
            login(data).then((res) => {
                setMessage({success: res?.success, error: res?.error})
                if (res?.twoFactor) setTwoFactor(true)
            })
        })
    }

    return <>
        <CardWrapper headerLabel={'Welcome back!'} backButtonLabel={`Don't have account?`} backButtonHref={'/register'}
                     showSocial>
            <Form {...form}>
                <form className={'space-y-6'}
                      onSubmit={form.handleSubmit((data) => onSubmit(data))}>
                    <div className={'space-y-4'}>
                        {twoFactor && <FormField control={form.control} name={'code'} render={(({field}) => (
                            <FormItem>
                                <FormLabel>2FA Code</FormLabel>
                                <FormControl/>
                                <Input disabled={isPending} {...field} type={'text'} placeholder={'123456'}/>
                                <FormMessage/>
                            </FormItem>
                        ))}/>}

                        {!twoFactor && <>
                            <FormField control={form.control} name={'email'} render={(({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl/>
                                    <Input disabled={isPending} {...field} placeholder={'john.doe@gmail.com'}
                                           type={'email'}/>
                                    <FormMessage/>
                                </FormItem>
                            ))}/>
                            <FormField control={form.control} name={'password'} render={(({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl/>
                                    <Input disabled={isPending} {...field} type={'password'} placeholder={'********'}/>
                                    <FormMessage/>
                                    <Button variant={'link'} size={'sm'} className={'px-0'} asChild>
                                        <Link href={'/reset-password'}>Forgot password?</Link>
                                    </Button>
                                </FormItem>
                            ))}/>
                        </>}
                    </div>
                    <FormError message={message.error || urlError}/>
                    <FormSuccess message={message.success}/>
                    <Button disabled={isPending} className={'w-full'} type={'submit'}>{twoFactor ? 'Confirm' : 'Login'}
                        {isPending && <BeatLoader size={7} color={'white'} className={'ml-2'}/>}</Button>
                </form>
            </Form>
        </CardWrapper>
    </>
}

export default LoginForm;