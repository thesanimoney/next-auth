import {TypographyH2} from "../ui/typographyH2";


interface HeaderProps {
    title: string,
    lable: string
}

function Header({title, lable}: HeaderProps) {
    return <>
        <div className={'w-full flex-col flex items-center justify-center gap-y-4'}>
            <TypographyH2 title={title}/>
            <p className={'text-zinc-500'}>{lable}</p>
        </div>
    </>
}

export default Header;