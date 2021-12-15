import LoadingComponent from "./PopupLoading";

export default {
    install(Vue, options) {
        var Loading = new Vue();

        Vue.prototype.$_loading = function (message) {
            Loading = new Vue({ 
                render(createElement) {
                    return createElement(LoadingComponent, {
                        props: {
                            message: message,
                        }
                    })
                }
            }).$mount();
            document.body.appendChild(Loading.$el)
        };

        Vue.prototype.$_resetLoading = function() {
            document.body.removeChild(Loading.$el);
        }
    }
}