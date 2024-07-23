import {useCurrentUser} from "./useCurrentUser";

export const useCurrentRole = () => {
        const {role} = useCurrentUser()
        return role
}