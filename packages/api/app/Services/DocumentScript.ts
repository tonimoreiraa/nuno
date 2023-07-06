import User from "../Models/User";
import { google } from 'googleapis';
import Env from '@ioc:Adonis/Core/Env'
import fs from 'fs/promises'

// Configurações de autenticação
const clientId = Env.get('GOOGLE_CLIENT_ID')
const clientSecret = Env.get('GOOGLE_CLIENT_SECRET')

export default {

    async createDocument(title: string, auth: any)
    {
        const drive = google.drive({ version: "v3", auth });  

        const document = await drive.files.create({
            requestBody: { name: title, mimeType: 'application/vnd.google-apps.document' },
            fields: 'id'
        })

        return document
    },

    async getGoogleAuth(user: User)
    {
        const oAuth2Client = new google.auth.OAuth2(
            clientId,
            clientSecret,
            'http://localhost:3333/google/callback'
        )
        
        const credentials: any = user.googleToken
        oAuth2Client.setCredentials({
            access_token: credentials.token,
            token_type: credentials.type,
            expiry_date: credentials.expiresIn,
            id_token: credentials.id_token,
            refresh_token: credentials.refreshToken
        })

        return oAuth2Client
    },

    async applyScript(documentId: any, auth: any)
    {
        const script = google.script({ version: "v1", auth })

        // Criação do projeto do Apps Script
        const appScript: any = await script.projects.create({
            /* @ts-ignore */
            resource: { title: 'ChatGPT Nuno', parentId: documentId }
        })
        
        /* @ts-ignore */
        await script.projects.updateContent({
            scriptId: appScript.data.scriptId,
            resource: {
                files: [
                    {
                        name: 'appsscript',
                        type: 'JSON',
                        source:  (await fs.readFile('./appsscript.json')).toString()
                    },
                    {
                        name: 'Codigo',
                        type: 'SERVER_JS',
                        source: (await fs.readFile('./script.gs')).toString(),
                    },
                ]
            }
        })

        return appScript
    }

}