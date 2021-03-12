import axios from './request'

export const postRequest = request => {
    let config = {
        method: 'post',
        url: request.url,
        data: {
            'check_request': {
                'timestamps': "20210223",
                'sign': "xxxxxxx"
            },
            'body': {
                ...request.param
            }
        }
    }
    return axios(config)
}

export const getRequest = data => {
    let config = {
        method: 'get',
        ...data
    }
    return axios(config)
}