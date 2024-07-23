'use client'

import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {registerSchema} from "../../schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import CardWrapper from "./cardWrapper";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Input} from "../ui/input";
import FormError from "../formError";
import FormSuccess from "../formSuccess";
import {Button} from "../ui/button";
import {register} from "../../actions/register";
import {BeatLoader} from "react-spinners";

function RegisterForm() {
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState({error: '', success: ''})

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            name: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        setMessage({success: '', error: ''})

        startTransition(() => {
            register(data).then((res) => setMessage({success: res.success, error: res.error}))
        })
    }

    return <>
        <CardWrapper headerLabel={'Create an account'} backButtonLabel={`Already have account?`} backButtonHref={'/login'}
                     showSocial>
            <Form {...form}>
                <form className={'space-y-6'}
                      onSubmit={form.handleSubmit((data) => onSubmit(data))}>
                    <div className={'space-y-4'}>
                         <FormField control={form.control} name={'name'} render={(({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl/>
                                <Input disabled={isPending} {...field} type={'text'} placeholder={'John Doe'}/>
                                <FormMessage/>
                            </FormItem>
                        ))}/>
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
                    <Button disabled={isPending} className={'w-full'} type={'submit'}>Sing Up
                      {isPending && <BeatLoader size={7} color={'white'} className={'ml-2'}/>}
                    </Button>
                </form>
            </Form>

        </CardWrapper>
    </>
}

export default RegisterForm;