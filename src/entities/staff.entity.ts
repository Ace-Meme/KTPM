import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ChildEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";


export enum StaffType {
  DOCTOR = 'Doctor',
  NURSE = 'Nurse',
}

export class Address {
  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @Column()
  country: string;
}

export class ContactDetails {
  @Column()
  phone: string;

  @Column()
  email: string;

  @Column(() => Address)
  address: Address;
}

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column(() => ContactDetails)
  contactDetails: ContactDetails;

  @Column({
    type: 'text',
    enum: StaffType,
    nullable: true,
  })
  type: StaffType;

  @OneToMany(() => ScheduleAppointment, (appointment) => appointment.staff, { cascade: true })
  schedules: ScheduleAppointment[];
  @OneToMany(() => WorkingSchedule, (schedule) => schedule.staff, { cascade: true })
  workingSchedules: WorkingSchedule[];
}

@ChildEntity()
export class Doctor extends Staff {
  @Column()
  specialization: string;

  constructor() {
    super();
    this.type = StaffType.DOCTOR;
  }
}

@ChildEntity()
export class Nurse extends Staff {
  @Column()
  department: string;

  constructor() {
    super();
    this.type = StaffType.NURSE;
  }
}

@Entity()
export class ScheduleAppointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Staff, (staff) => staff.schedules, { onDelete: 'CASCADE' })
    staffInfo: Staff;

  @Column()
  date: Date;

  @Column()
  startTime: number; // 6 => 6 AM, 18 => 6 PM

  @Column()
  endTime: number;

  @Column()
  description: string;

  @ManyToOne(() => Staff, (staff) => staff.schedules, { onDelete: 'CASCADE' })
  staff: Staff;
}
@Entity()
export class WorkingSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Staff, (staff) => staff.workingSchedules)
  staff: Staff;

  @Column()
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  @Column()
  startTime: number; // Giờ bắt đầu (6 = 6 AM, 13 = 1 PM, v.v.)

  @Column()
  endTime: number; // Giờ kết thúc

  @Column({ nullable: true })
  isDayOff: boolean; // Có phải là ngày nghỉ không
}