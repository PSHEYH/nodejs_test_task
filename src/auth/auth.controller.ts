import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponse } from './dto/auth-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: AuthResponse })
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const payload = await this.authService.validateUser(dto);
    return await this.authService.login(payload.id, payload.role);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiBody({ type: RegistrationDto })
  @ApiResponse({ status: 201, type: AuthResponse })
  @Post('register')
  async registration(@Body() dto: RegistrationDto) {
    return await this.authService.registration(dto);
  }
}
