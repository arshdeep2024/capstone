export const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
    geminiKey: String(import.meta.env.VITE_GENAI_KEY),
    databaseId: String(import.meta.env.VITE_DATABASE_ID),
    cartCollectionId: String(import.meta.env.VITE_CART_COLLECTION_ID),
    ordersCollectionId: String(import.meta.env.VITE_ORDERS_COLLECTION_ID)
}