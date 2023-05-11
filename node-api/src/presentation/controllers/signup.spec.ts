import { InvalidParamError } from './../errors/invalid-param-error';
import { SignUpController } from './SignUp';
import {MissingParamError} from '../errors/missing-param-error';
import { EmailValidator } from '../protocols/email-validator';

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}
const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator{ //injeção mockada
    isValid(email: string): boolean{
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub); //quando criarmos novas dependencias, não precisaremos mudar nenhum dos construtores dos testes
  return {
    sut,
    emailValidatorStub
  }
}//factory

describe('SignUp Controller', () => {  
  test('Se não enviar um nome no body da requisição tipo post retorna o erro 400', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'qualquer_nome@mail.com',
        password: 'qualquer_password',
        passwordConfirmation: 'qualquer_password',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name')) //comparar objetos com o toBe não funciona pois ele compara "ponteiro" a "ponteiro", necessitando que os dois fossem idênticos, logo, trocaremos o toBe para comparar só os valores do objeto e ver se são iguais
  })
})

describe('SignUp Controller', () => {  
  test('Se não receber um email no body da requisição tipo post  erro 400', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        password: 'qualquer_password',
        passwordConfirmation: 'qualquer_password',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email')) 
  })
})

describe('SignUp Controller', () => {  
  test('Se não tiver um password deverá retornar 400', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'qualquer_nome@mail.com',
        passwordConfirmation: 'qualquer_password',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password')) 
  })
})

describe('SignUp Controller', () => {  
  test('Se não tiver um passwordConfirmation deverá retornar 400', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'qualquer_nome@mail.com',
        password: 'qualquer_password',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation')) 
  })
})

describe('SignUp Controller', () => {  
  test('Se o email for invalido deverá retornar 400', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'email_invalido@mail.com',
        password: 'qualquer_password',
        passwordConfirmation: 'qualquer_password',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email')) 
  })
})