import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({ type: String, description: 'Authentification token' })
  access_token: string;
}
