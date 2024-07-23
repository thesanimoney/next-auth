'use client'

import {ReactNode} from "react";
import {Card, CardContent, CardFooter, CardHeader} from "../ui/card";
import Header from "./header";
import Social from "./social";
import BackButton from "./backButton";


interface CardWrapperProps {
    children: ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

function CardWrapper({children, headerLabel, backButtonLabel, backButtonHref, showSocial}:CardWrapperProps) {
    return <>
        <Card className={'w-[400px] shadow-md'}>
            <CardHeader>
                <Header title={'🔐Auth'} lable={headerLabel}></Header>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && <CardFooter>
                <Social/>
            </CardFooter>}
            <CardFooter className={'flex justify-center'}>
                <BackButton lable={backButtonLabel} href={backButtonHref}/>
            </CardFooter>
        </Card>
    </>
}

export default CardWrapper;