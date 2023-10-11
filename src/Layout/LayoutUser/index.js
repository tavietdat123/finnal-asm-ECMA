import Footer from "./Footer";
import Header from "./Header";

function LayoutUser(content, current) {
    return (`
    ${Header()}
    ${content(current)}
    ${Footer()}
    
    `);
}

export default LayoutUser;