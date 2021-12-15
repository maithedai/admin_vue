
import gettingstarted from "./routes/getting-started";
import subject from "./routes/subject";
import category from "./routes/category";
import exam from "./routes/exam";
import user from "./routes/user";

const modules = [
    {
        path: '/',
        name: 'default',
        redirect: "/home",
    },
    user,
    gettingstarted,
    subject,
    exam,
    category,
];

// chuyển hết module thành mảng
function getRoutes() {
    let routers = [];
    modules.forEach(module => {
        if(!module.length) {
            routers.push(module);
        }
        else {
            module.forEach(ele => {
                routers.push(ele);
            })
        }
    })
    return routers;
};

const routes = getRoutes();

export default routes;
