import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
    client = new Client();
    database;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.bucket = new Storage(this.client);
    }
    async createPost({ title, slug, content, featureImage, status, userId }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }
    async updatePost(slug, { title, content, featureImage, status }) {
        try {
            return await this.database.updateDocument(
                conf.appwriteBucketId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);

        }
    }
    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteBucketId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
        }
    }

    //file upload service

    async uploadFile() {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletFile :: error", error);
            return false
        }
    }
    getFilePreview(fielId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fielId
        )
    }
}
const service = new Service()
export default service