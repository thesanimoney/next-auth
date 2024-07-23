'use client'

import CardWrapper from "./cardWrapper";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import FormSuccess from "../formSuccess";
import FormError from "../formError";
import {BeatLoader} from "react-spinners";
import {newVerification} from "../../actions/newVerification";

function NewVerificationForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [error, setError] = useState<string>()
    const [success, setSuccess] = useState<string>()

    const onSubmit = useCallback(() => {
        if (!token) return setError('Missing Token')

        newVerification(token).then(res => {
            if (res.error) return setError(res.error)
            setSuccess(res.success)

        }).catch(() => setError('Something went wrong...'))

    }, [token])

    useEffect(() => {
            if (token) {
                onSubmit()
            }
        },
        [onSubmit, token])

    return <>
        <CardWrapper headerLabel={'Verification Form'} backButtonLabel={'To Login'}
                     backButtonHref={'/login'}>
            <div className={'flex justify-center items-center w-full'}>
                <FormSuccess message={success}/>
                <FormError message={error}/>
                {error || success ? '' : <BeatLoader/>}
            </div>
        </CardWrapper>
    </>
}

export default NewVerificationForm;