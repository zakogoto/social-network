export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
  }
  
  export type PhotosType = {
    large: string | null
    small: string | null
  }
  
  export type ProfileType = {
    id: number | null,
    fullName: string | null,
    photos: PhotosType,
    lookingForAJob: boolean,
    aboutMe: string | null,
    lookingForAJobDescription: string | null,
    contacts: ContactsType
  }
  
export type PostType = {
  id: number,
  name: string,
  message: string,
  imgSrc: string
}

export type DialogType = {
  id: number
  userName: string
  hasNewMessages: boolean
  lastDialogActivityDate: string
  lastUserActivityDate: string
  newMessagesCount: number
  photos: PhotosType
}

export type MessagesType = {
  id: string
  body: string
  translatedBody: string | null
  addedAt: string
  senderId: number
  senderName: string
  recipientId: number
  viewed: boolean
}

export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
}
