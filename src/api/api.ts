import axios from "axios";
import { DialogType, MessagesType, PhotosType, ProfileType, UserType } from "../redux/types";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "9741e9be-0c76-45a0-92cf-c4b223b76cbc"
    },
    baseURL : 'https://social-network.samuraijs.com/api/1.0/'
})

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export type CommonResponseType = {
    resultCode: ResultCodes
    messages: Array<string>
    data: {}
}

type GetProfileResponseType = ProfileType

type GetProfileStatusResponseType = string

type SavePhotoResponseType = {
    data: {
        photos: PhotosType
    }
    resultCode: ResultCodes
    messages: Array<string>
}


export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type AuthMeResponseType = {
    data: {
        id: number,
        email: string,
        login: string
    }
    resultCode: ResultCodes
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        id: number
    }
    resultCode: ResultCodes | ResultCodeForCaptcha
    messages: Array<string>
}

type LogoutResponseType = {
    resultCode: ResultCodes
    messages: Array<string>
    data:{}
}

type GetCaptchaResponseType = {
    url: string
}

type GetAllDialogsResponseType = Array<DialogType>
type GetAllMessagesWithUserResponseType = {
    error: Array<string> | null
    items: Array<MessagesType>
    totalCount: number
}

// export type FollowUserApiType = (id: number) => Promise<CommonResponseType>

export const DialogsAPI = {
    async getAllDialogs () {
        return await instance.get<GetAllDialogsResponseType>('dialogs').then(res => res.data)
    },
    async getListOfMessages (userId: number) {
        return await instance.get<GetAllMessagesWithUserResponseType>(`dialogs/${userId}/messages`).then(res => res.data)
    },
    async startChatting (userId: number) {
        return await instance.put(`dialogs/${userId}`).then(res => res)
    },
    async SendMessage (userId: number, body: string) {
        return await instance.post(`dialogs/${userId}/messages`, {body}).then(res => res.data)
    }
}

export const usersAPI = {
    async getUsers (page: number, pageSize: number) {
        return await instance.get<GetUsersResponseType>(`users?page=${page}&count=${pageSize}`).then(res => res.data)
    },

    followUser: async (id: number) => {
        return await instance.post<CommonResponseType>(`follow/${id}`).then(res => res.data)
    },

    async unfollowUser (id: number): Promise<CommonResponseType> {
        return instance.delete<CommonResponseType>(`follow/${id}`).then(res => res.data)
    },
    
}

export const profileAPI = {
    getProfile: async (userId: number | null) => {
        return await instance.get<GetProfileResponseType>(`profile/${userId}`).then(res=> res.data)
    },
    updateProfile(formData: ProfileType) {
        return instance.put<CommonResponseType>('profile', formData)
    },
    async getProfileStatus (userId: number) {
        return await instance.get<GetProfileStatusResponseType>(`profile/status/${userId}`).then(res => res.data)
    },
    updateProfileStatus (status: string) {
        return instance.put<CommonResponseType>(`profile/status`, {status: status})
    },
    savePhoto (photo: any) {
        const formData = new FormData();
        
        formData.append('image', photo)
        return instance.put<SavePhotoResponseType>('profile/photo', formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }).then(res => res.data)
    }
}

export  const authAPI = {
    async authMe () {
        return await instance.get<AuthMeResponseType>('auth/me').then(res => res.data) 
    },
    async login (email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        return await instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha}).then(res => res.data)
    },
    async logout () {
        return await instance.delete<LogoutResponseType>('auth/login').then(res => res.data)
       
    }
}

export const securityAPI = {
    async getCaptcha () {
        return await instance.get<GetCaptchaResponseType>('security/get-captcha-url').then(res => res.data)
    }
}