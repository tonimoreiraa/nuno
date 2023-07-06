import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DocumentScript from '../../Services/DocumentScript';

export default class DocumentsController {

    async store({ auth, request }: HttpContextContract)
    {
        const title = request.input('title')

        const oAuth2Client = await DocumentScript.getGoogleAuth(auth.user)
        const document = await DocumentScript.createDocument(title, oAuth2Client)
        const appScript = await DocumentScript.applyScript(document.data.id, oAuth2Client)

        return {
            documentId: document.data.id,
            appScriptId: appScript.data.scriptId,
            documentURL: 'https://docs.google.com/document/d/' + document.data.id
        }
    }

}
