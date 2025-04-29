import { IsEnum, IsNotEmpty, IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { StaffType } from '../entities/staff.entity';

export class AddressDTO {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

export class ContactDetailsDTO {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;
}

export class CreateStaffDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(StaffType)
  type: StaffType;

  @ValidateNested()
  @Type(() => ContactDetailsDTO)
  contactDetails: ContactDetailsDTO;

  @IsOptional()
  @IsString()
  specialization?: string; // Optional for Doctor

  @IsOptional()
  @IsString()
  department?: string; // Optional for Nurse
}