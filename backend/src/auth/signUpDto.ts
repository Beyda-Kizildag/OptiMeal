import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class SignUpDto {
  @IsString({ message: 'İsim geçerli bir metin olmalıdır.' })
  @IsNotEmpty({ message: 'İsim alanı boş bırakılamaz.' })
  name!: string;

  @IsEmail({}, { message: 'Geçerli bir e-posta adresi giriniz.' })
  email!: string;

  @IsNotEmpty({ message: 'Şifre alanı boş bırakılamaz.' })
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır.' })
  pass!: string;
}