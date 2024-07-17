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
    const [message, setMessage] = useState({error: '', success: ''})

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setMessage({success: '', error: ''})

        startTransition(() => {
            login(data).then((res) => setMessage({success: res?.success, error: res?.error}))
        })
    }

    return <>
        <CardWrapper headerLabel={'Welcome back!'} backButtonLabel={`Don't have account?`} backButtonHref={'/register'}
                     showSocial>
            <Form {...form}>
                <form className={'space-y-6'}
                      onSubmit={form.handleSubmit((data) => onSubmit(data))}>
                    <div className={'space-y-4'}>
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
                            </FormItem>
                        ))}/>
                    </div>
                    <FormError message={message.error}/>
                    <FormSuccess message={message.success}/>
                    <Button disabled={isPending} className={'w-full'} type={'submit'}>Login</Button>
                </form>
            </Form>
        </CardWrapper>
    </>
}

export default LoginForm;