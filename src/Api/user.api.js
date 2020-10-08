import axios from "axios";

axios.interceptors.request.use(function (config) {
    config.headers = {
        ...config.headers,
        Authorization: localStorage.getItem('access_token'),
    }
    return config;
}, function (error) {
    console.log('REQUEST ERROR');
    return Promise.reject(error);
});

export const getUserFetch = async (id) => {
    const {data} = await axios.get(`https://hipstagram-api.herokuapp.com/users/${id}`);
    return data;
}

export const updateCurrentUserFetch = async (updateUserData) => {
    const {data} = await axios.patch(`https://hipstagram-api.herokuapp.com/users/current`, updateUserData);
    return data;
}

export const createPostFetch = async (postData) => {
    const {data} = await axios.post(`https://hipstagram-api.herokuapp.com/posts`, postData);
    return data;
}

export const getPostByIdFetch = async (postId) => {
    const {data} = await axios.get(`https://hipstagram-api.herokuapp.com/posts/${postId}`);
    return data;
} 

export const getUsersByLoginFetch = async (userLogin) => {
    const {data} = await axios.get(`https://hipstagram-api.herokuapp.com/users?search=${userLogin}`);
    return data;
}

export const updatePasswordFetch = async (updatePassword) => {
    const {data} = await axios.post(`https://hipstagram-api.herokuapp.com/auth/updatePassword`, updatePassword);
    return data;
}

export const getFeedFetch = async () => {
    const {data} = await axios.get(`https://hipstagram-api.herokuapp.com/posts/feed`);
    return data;
}

export const likePostFetch = async (postId) => {
    const {data} = await axios.get(`https://hipstagram-api.herokuapp.com/posts/like/${postId}`);
    return data;
}

export const followUserFetch = async (userId) => {
    await axios.get(`https://hipstagram-api.herokuapp.com/users/follow/${userId}`);
}