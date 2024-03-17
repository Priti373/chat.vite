import { Client , Databases} from 'appwrite';

export const PROJECT_ID='65ce64cb265cb561ce35'
export const DATABASE_ID='65ce69cbd74055cd149b'
export const COLLECTION_ID_MESSAGES='65ce69e8e6eba8fe3510'

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65ce64cb265cb561ce35');


export const databases = new Databases(client);
export default Client;