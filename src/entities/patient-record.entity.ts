import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class PatientRecord {
  @PrimaryColumn()
  patientID: number; 
  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patientID' })
  patient: Patient;
  @Column({ type: 'date' })
  recordDate: Date; 
  @Column({ type: 'text', nullable: false })
  diagnosis: string; 
  @Column({ type: 'text', nullable: true })
  description: string;
}