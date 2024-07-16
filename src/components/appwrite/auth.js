import { Client, Account, ID, Databases } from "appwrite";
import {config} from '../config/config'
import { Query } from "appwrite";

export class AuthService {
    client = new Client()
    account;
    database;

    constructor () {
        this.account = new Account(this.client)
        this.database = new Databases(this.client)
        this.client
        
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        
    }

    async createAccount({name, password, email}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return authService.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            console.log("Appwrite Service :: createAccount :: error ", error)
        }
    }

    async getCurrentUser() {
        try {
            const currentUser = await this.account.get()
            return currentUser
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ", error)
        }

        return null
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Appwrite service :: login :: error ", error)
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error ", error)
        }

        return null
    }

    async addToCart({itemName, itemId, userId, price, img}) {
        try {
            return await this.database.createDocument(
                config.databaseId,
                config.cartCollectionId,
                ID.unique(),
                {
                    itemName,
                    itemId,
                    userId,
                    price,
                    img,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: addToCart :: error ", error)
        }
    }

    async removeFromCart({itemId, userId}) {
        try {
            const documents = await this.database.listDocuments(
                config.databaseId,
                config.cartCollectionId,
                [
                    Query.equal('userId', userId),
                    Query.equal('itemId', itemId)
                ],
            )
            if (documents) {
                console.log("TRYING TO DELETE FROM CART : ", documents)
                // for (const document in documents.documents) {
                //     console.log('Deleting : ', document.$id)
                    const deleted = await this.database.deleteDocument(
                        config.databaseId,
                        config.cartCollectionId,
                        documents.documents[0].$id,
                    )
                //     console.log("Deleted : ", deleted)
                // }
            }
        } catch (error) {
            console.log("Appwrite service :: removeFromCart :: error ", error)
        }
    }

    async placeOrder({itemName, itemId, userId, deliveryBy, delivered, price}) {
        // also delete from cart
        try {
            await this.database.createDocument(
                config.databaseId,
                config.ordersCollectionId,
                ID.unique(),
                {
                    itemName,
                    itemId,
                    userId,
                    deliveryBy,
                    delivered,
                    price,
                }
            )
            console.log("Purchased")
            return authService.removeFromCart({itemId, userId})
        } catch (error) {
            console.log("Appwrite service :: placeOrder :: error ", error)
        }
    }

    async getCart(userId) {
        try {
            return await this.database.listDocuments(
                config.databaseId,
                config.cartCollectionId,
                [
                    Query.equal('userId', `${userId}`)
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: getCart :: error ", error)
        }
    }

    async getOrderedItems(userId) {
        try {
            return await this.database.listDocuments(
                config.databaseId,
                config.ordersCollectionId,
                [
                    Query.equal('userId', `${userId}`)
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: getCart :: error ", error)
        }
    }
}

const authService = new AuthService()

export default authService