import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

export enum StaffType {
    DOCTOR = 'DOCTOR',
    NURSE = 'NURSE',
    OTHER = 'OTHER',
}

@Entity()
export class Staff {
    @Column({ primary: true, generated: true })
    id: number;
    @Column()
    name: string;
    @Column({           //CHANGE
        // type: 'enum', 
        type: 'varchar', 
        enum: StaffType, 
        default: StaffType.OTHER
    })
    type: StaffType;
    @OneToMany(() => Schedule, (schedule) => schedule.staffInfo, { cascade: true })
    schedules: Schedule[];
}

@Entity()
export class Schedule {
    @Column({ primary: true, generated: true })
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
}

// export class Doctor implements Staff {
//     id: number;
//     name: string;
//     specialty: string;
// }

// export class Nurse implements Staff {
//     id: number;
//     name: string;
//     department: string;
// }