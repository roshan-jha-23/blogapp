import conf from '../conf/conf'

import {Client,Account,ID} from 'appwrite'


export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client)  
    }
    async createAccount({email,password,name}){
        try {
           const userAccount= await this.account.create(ID.unique, email,password,name);
           if (userAccount) {
            //call another method
           return this.login;
           } else {
               return userAccount;
           }
            
        } catch (error) {
           console.log(error);
        }
    }
    async login({email,password}){
        try {
          return  await this.account.createEmailSession(email, password); 
        } catch (error) {
            console.log(error);
        }
    }
    async getCurrentUser(){
   try {
        let user =await this.account.get();
       if (!user){
         throw new Error('No User Logged In');
       }else{
         return user;
       }
   } catch (error) {
      console.log(error);
   }
   return null;
    }
    async logout(){
        try {
             await this.account.deleteSessions();
        } catch (error) {
            console.log(error);
        }
    }
}

const authService=new AuthService();

export default authService