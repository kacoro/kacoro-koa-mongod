import request from './request';

async function getData(path) {
    switch (path) {
        case '/':
            var data = {};
            await request.config({ url: '/api/user' }).then(res => {
                data = res;
            });
            return data;
            case '/first':
                var data = {};
                await request.config({ url: '/api/user' }).then(res => {
                    data = res;
                });
                return data;
        default:
            return { path };
    }
}

export default getData;
