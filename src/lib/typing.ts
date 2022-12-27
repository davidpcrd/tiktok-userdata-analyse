export interface ProfileData{
    bioDescription: string
    birthDate: string
    emailAddress: string
    telephoneNumber: string
    userName: string
    profilePhoto: string
    profileVideo: string
    interests: string[]
}

export interface LoginInfo{
    Date: string
}

export interface CardInfo{
    text: string
    value: number | string
}