import { router } from "../../../main";
import Header from "./Header";

function LayoutAdmin(content, params) {
    const user = JSON.parse(localStorage.getItem('infoUser'))
    if (user.role !== 1) {
        router.navigate('/sign-in')
    }
    return (`
    ${Header()} 
    <div style="margin:70px 0 0 260px;padding:30px">${content(params)}</div>
    `);
}

export default LayoutAdmin;