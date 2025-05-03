import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class PatientRecord {
  @PrimaryGeneratedColumn()
  id: number; // Auto-generated primary key

  @Column()
  patientID: number; // Foreign key to the patient table
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