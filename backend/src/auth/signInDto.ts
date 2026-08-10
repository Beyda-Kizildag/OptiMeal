import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class SignInDto {
    @IsEmail({}, { message: 'Lütfen geçerli bir e-posta giriniz.' })
    email!: string;

    @IsNotEmpty({ message: 'Şifre girmelisiniz.' })
    @MinLength(6, { message: 'Şifre hatalı veya eksik.' })
    pass!: string;
}