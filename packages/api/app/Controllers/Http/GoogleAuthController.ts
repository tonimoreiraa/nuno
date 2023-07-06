import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import Env from '@ioc:Adonis/Core/Env'

export default class GoogleAuthController {

    async handleGoogleAuth({ ally }: HttpContextContract) {
        const url = await ally.use('google').redirectUrl((redirectRequest) => {
            redirectRequest
            .param('access_type', 'offline')
            .param('prompt', 'select_account')
            .scopes(['drive', 'drive.scripts', 'documents', 'userinfo.email', 'userinfo.profile', 'https://www.googleapis.com/auth/script.projects'])
        })
        return { provider: 'google', url }
    }

    async callback({ ally, auth, response }: HttpContextContract) {
        const google = ally.use('google')

        const googleUser: any = await google.user()
        console.log(JSON.stringify(googleUser.token))

        const user = await User.firstOrCreate({ email: googleUser.email }, {
            name: googleUser.name,
            googleToken: googleUser.token
        })

        const token = await auth.use('api').login(user)
        const redirectURI = Env.get('REDIRECT_URI_LOGIN')
        
        return response.redirect(redirectURI + '?token=' + token.token)
    }

}
