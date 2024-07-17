'use client'

import Link from "next/link";
import {Button} from "../ui/button";

interface BackButtonProps {
    href: string,
    lable: string
}

function BackButton({href, lable}: BackButtonProps) {
    return <>
        <Button variant={'link'} asChild>
            <Link href={href}>
                {lable}
            </Link>
        </Button>

    </>
}

export default BackButton;