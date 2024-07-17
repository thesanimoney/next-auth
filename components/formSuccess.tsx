import {Check} from "lucide-react";

interface FormSuccessProps {
    message?: string
}

function FormSuccess({message}:FormSuccessProps) {
    if (!message) return null

    return <>
<div className={'bg-green-800/15 p-3 rounded-md flex items-center text-sm text-green-700 gap-x-2'}>
    <Check />
    <p>{message}</p>
</div>
    </>
}

export default FormSuccess;