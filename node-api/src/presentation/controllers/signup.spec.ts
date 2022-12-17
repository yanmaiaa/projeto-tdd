import { SignUpController } from './SignUp';


describe('SignUp Controller', () => {  
  test('Se não enviar um nome no body da requisição tipo post retorna o erro 400', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'qualquer_nome@mail.com',
        password: 'qualquer_password',
        passwordConfirmation: 'qualquer_password',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})