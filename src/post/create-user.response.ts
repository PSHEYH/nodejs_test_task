import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponse{
    @ApiProperty({ description: 'Id of created user', type: String})
    id: string;
}