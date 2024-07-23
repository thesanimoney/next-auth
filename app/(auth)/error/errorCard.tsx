import {Card, CardFooter, CardHeader, CardTitle} from "../../../components/ui/card";
import Header from "../../../components/auth/header";
import BackButton from "../../../components/auth/backButton";

function ErrorCard() {
    return <>
<Card>
    <CardHeader>
        <Header title={'Error'} lable={"Oops something went wrong..."}/>
    </CardHeader>
    <CardFooter>
        <BackButton href={'/login'} lable={'Login again.'}/>
    </CardFooter>
</Card>
    </>
}

export default ErrorCard;