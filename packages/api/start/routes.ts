import Route from '@ioc:Adonis/Core/Route'

Route.get('/auth/google', 'GoogleAuthController.handleGoogleAuth')
Route.get('/google/callback', 'GoogleAuthController.callback')

Route.post('/documents', 'DocumentsController.store')