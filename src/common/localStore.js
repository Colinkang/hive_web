export default {
    getItem: function (key) {
        let value;
        try {
            value = localStorage.getItem(key);
        } catch (e) {
            console.error('localStore.getItem报错', e.message);
        }
        return value;
    },
    setItem: function (key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.error('localStore.setItem报错', e.message)
        }
    }
}