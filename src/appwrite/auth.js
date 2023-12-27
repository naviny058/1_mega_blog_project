import { useActionData } from 'react-router-dom';
import conf from '../conf/conf';
import { Client, Account, ID } from "appwrite";

//whenever need you backend as a service 
// use this snippet

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (useActionData) {
                return this.login({ email, password })
            } else {
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser() {
        try {
            await this.account.get();
        } catch (error) {
            console.log('Appwrite service :: getcurrentUser :: error', error);
        }
        return null;
    }
    async logout() {
        try {
            return this.account.deleteSessions()
        } catch (error) {
            console.log('Appwrite service :: getcurrentUser :: error', error);
        }
    }
}

const authService = new authService()
export default AuthService