import { DataSource } from 'typeorm';
import { Doctor, Nurse, Staff, ScheduleAppointment } from '../entities/staff.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database/hospital.db',
  entities: [Doctor, Nurse, Staff, ScheduleAppointment], 
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const doctor = new Doctor();
  doctor.name = 'Dr. John Smith';
  doctor.specialization = 'Cardiology';
  doctor.contactDetails = {
    phone: '123-456-7890',
    email: 'john.smith@hospital.com',
    address: {
      street: '123 Main St',
      city: 'Hanoi',
      zipcode: '10000',
      country: 'Vietnam',
    },
  };

  const nurse = new Nurse();
  nurse.name = 'Nurse Anna Nguyen';
  nurse.department = 'Emergency';
  nurse.contactDetails = {
    phone: '098-765-4321',
    email: 'anna.nguyen@hospital.com',
    address: {
      street: '456 Side St',
      city: 'Hanoi',
      zipcode: '10001',
      country: 'Vietnam',
    },
  };

  await AppDataSource.manager.save([doctor, nurse]);
  console.log('✅ Seeded staff data successfully!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error while seeding staff data:', err);
});
