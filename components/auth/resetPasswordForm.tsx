'use client'

import CardWrapper from "./cardWrapper";
import {useState, useTransition} from "react";
import FormSuccess from "../formSuccess";
import FormError from "../formError";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {loginSchema, resetPasswordSchema} from "../../schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {resetPassword} from "../../actions/resetPassword";
import {BeatLoader} from "react-spinners";


function ResetPasswordForm() {
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: '',
        }
    })

    const [error, setError] = useState<string>()
    const [success, setSuccess] = useState<string>()
    const [sent, setSent] = useState(false)
    const [isPending, startTransition] = useTransition()

    const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            resetPassword({email: data?.email}).then(res => {
                setError(res?.error);
                setSuccess(res.success);
                if (!res?.error && res.success) {
                    setSent(true);
                    setTimeout(() => {
                        setSent(false);
                        setSuccess('')
                    }, 10000);
                }
            });
        });
    };

    return <>
        <CardWrapper headerLabel={'Reset Form'} backButtonLabel={'Back to login'}
                     backButtonHref={'/login'}>
            <div className={'flex justify-center items-center'}>
                <Form {...form}>
                    <form className={'w-full flex flex-col space-y-2'}
                          onSubmit={form.handleSubmit((data) => onSubmit(data))}>
                        <div>
                            <FormField control={form.control} name={'email'} render={(({field}) => (
                                <FormItem>
                                    <FormLabel>Please enter email to reset password.</FormLabel>
                                    <FormControl/>
                                    <Input className={'w-full'} disabled={isPending} {...field}
                                           placeholder={'john.doe@gmail.com'}
                                           type={'email'}/>
                                    <FormMessage/>
                                </FormItem>
                            ))}/>
                        </div>
                        <div className={'w-full'}>
                            <FormSuccess message={success}/>
                            <FormError message={error}/>
                        </div>
                        <Button disabled={sent || isPending} variant={'default'} type={'submit'}>
                            {sent ? 'Check your email' : 'Send Email'}
                            {isPending && <BeatLoader color={'white'} className={'ml-2'} size={7}/>}
                        </Button>
                    </form>
                </Form>
            </div>
        </CardWrapper>
    </>
}

export default ResetPasswordForm;