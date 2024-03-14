import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "9741e9be-0c76-45a0-92cf-c4b223b76cbc"
    },
    baseURL : 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersAPI = {
    async getUsers (page, pageSize) {
        const response = await instance.get(`users?page=${page}&count=${pageSize}`);
        return response.data;
    },

    async followUser (id) {
        const response = await instance.post(`follow/${id}`);
        return response;
    },

    async unfollowUser (id) {
        const response = await instance.delete(`follow/${id}`);
        return response;
    },
    
}

export const profileAPI = {
    getProfile (userId) {
        return instance.get(`profile/${userId}`)
    },
    getProfileStatus (userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateProfileStatus (status) {
        return instance.put(`profile/status`, {status: status})
    },
}


export  const authAPI = {
    async authMe () {
        try {
            const response = await instance.get('auth/me');
            if (response.data.resultCode === 0) {
                return response.data;
            }
        } catch(e) {
            console.log(e.message)
        }
    },
    async login (email, password, rememberMe) {
        try {
            const response = await instance.post('auth/login', {email, password, rememberMe});
            return response;
        }
        catch (e) {
            console.log(e)
        }
    },
    async logout () {
        try {
            const response = await instance.delete('auth/login');
            return response;
        }
        catch (e) {
            console.log(e)
        }
    }
}