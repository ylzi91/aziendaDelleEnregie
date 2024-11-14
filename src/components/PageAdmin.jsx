import { BodyAdmin } from "./BodyAdmin";
import { HeaderAdmin } from "./HeaderAdmin";

export function PageAdmin({ myProfile}){

    return(
        <>
        <HeaderAdmin myProfile={ myProfile}/>
        <BodyAdmin myProfile = {myProfile}/>
        
        </>
    )


}