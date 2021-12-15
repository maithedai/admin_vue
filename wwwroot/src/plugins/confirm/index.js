import ConfirmComponent from "./confirm";

export default {
    install(Vue, options) {
        Vue.prototype.$_confirm = function (type, title, message, buttons) {
            var Confirm = new Vue({ 
                render(createElement) {
                    return createElement(ConfirmComponent, {
                        props: {
                            type: type,
                            title: title,
                            message: message,
                            buttons: buttons
                        }
                    })
                }
            }).$mount();
            document.body.appendChild(Confirm.$el)
        }
    }
}