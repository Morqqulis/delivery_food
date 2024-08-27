import type { NextAuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
export const options: NextAuthOptions = {
 providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: {  label: "Password", type: "password", placeholder: "●●●●●●●●" },
        },
        async authorize(credentials, req) {
            const user={
                id: "1",
                name:"John",
                password:"12345"
            }
            if(user.name===credentials?.username && user.password===credentials?.password){
                return user
            }else{
                return null
            }
        }
    })
 ],   
}