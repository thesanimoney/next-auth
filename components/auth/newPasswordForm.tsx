'use client'

import CardWrapper from "./cardWrapper";
import {useCallback, useEffect, useState, useTransition} from "react";
import FormSuccess from "../formSuccess";
import FormError from "../formError";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {newPasswordSchema} from "../../schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {BeatLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import {newVerificationPassword} from "../../actions/newVerification";
import updatePassword from "../../actions/updatePassword";

function NewPasswordForm() {
    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: '',
        }
    })

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [error, setError] = useState<string>()
    const [success, setSuccess] = useState<string>()
    const [isPending, startTransition] = useTransition()

    const onConfirm = useCallback(() => {
        if (!token) return setError('Missing token, please try again.')

        newVerificationPassword(token).then(res => {
            if (res.error) return setError(res.error)
        }).catch(() => setError('Something went wrong...'))
    }, [token])

    useEffect(() => {
            onConfirm()
        },
        [onConfirm, token])

    const onSubmit = (data: z.infer<typeof newPasswordSchema>) => {
        startTransition(() => {
            updatePassword(data.password, token).then(res => {
                setSuccess(res.success)
                setError(res.error)
            })
        })
    }

    return <>
        <CardWrapper headerLabel={'Create new password'}
                     backButtonLabel={success !== 'Password updated successfully!' ? 'Back to email confirmation' : 'To Login'}
                     backButtonHref={success !== 'Password updated successfully!' ? '/reset-password' : '/login'}>
            <div className={'flex justify-center items-center'}>
                <Form {...form}>
                    <form className={'w-full flex flex-col space-y-2'}
                          onSubmit={form.handleSubmit((data) => onSubmit(data))}>
                        <div>
                            <FormField control={form.control} name={'password'} render={(({field}) => (
                                <FormItem>
                                    <FormLabel>Please enter new password.</FormLabel>
                                    <FormControl/>
                                    <Input className={'w-full'} disabled={isPending} {...field}
                                           placeholder={'******'}
                                           type={'password'}/>
                                    <FormMessage/>
                                </FormItem>
                            ))}/>
                        </div>
                        <div className={'w-full'}>
                            {!isPending && <>
                            <FormSuccess message={success}/>
                            <FormError message={error}/>
                            </>}
                        </div>
                        {error !== 'Missing token, please try again.' &&
                            <Button disabled={isPending || error === 'Security token does not exist, please try again!'}
                                    variant={'default'} type={'submit'}>
                                {isPending ? 'Please Wait' : 'Change Password'}
                                {isPending && <BeatLoader color={'white'} className={'ml-2'} size={7}/>}
                            </Button>}
                    </form>
                </Form>
            </div>
        </CardWrapper>
    </>
}

export default NewPasswordForm;