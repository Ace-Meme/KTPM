import { DataSource } from 'typeorm';
import { Doctor, Nurse, Staff, ScheduleAppointment, WorkingSchedule } from '../entities/staff.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database/hospital.db',
  entities: [Doctor, Nurse, Staff, ScheduleAppointment, WorkingSchedule], 
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  await AppDataSource.transaction(async (transactionalEntityManager) => {
    // Delete data
    await transactionalEntityManager.delete(WorkingSchedule, {});
    await transactionalEntityManager.delete(ScheduleAppointment, {});
    await transactionalEntityManager.delete(Doctor, {});
    await transactionalEntityManager.delete(Nurse, {});
    await transactionalEntityManager.delete(Staff, {});

    // Reset autoincrement IDs
    await transactionalEntityManager.query(`
      DELETE FROM sqlite_sequence 
      WHERE name IN ('staff', 'doctor', 'nurse', 'working_schedule', 'schedule_appointment');
    `);
  });

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
  const doctorSchedule1 = new WorkingSchedule();
  doctorSchedule1.staff = doctor;
  doctorSchedule1.dayOfWeek = 1; // Monday
  doctorSchedule1.startTime = 8;
  doctorSchedule1.endTime = 12;
  doctorSchedule1.isDayOff = false;

  const doctorSchedule2 = new WorkingSchedule();
  doctorSchedule2.staff = doctor;
  doctorSchedule2.dayOfWeek = 1; // Monday
  doctorSchedule2.startTime = 13;
  doctorSchedule2.endTime = 17;
  doctorSchedule2.isDayOff = false;

  const doctorSchedule3 = new WorkingSchedule();
  doctorSchedule3.staff = doctor;
  doctorSchedule3.dayOfWeek = 3; // Wednesday
  doctorSchedule3.startTime = 8;
  doctorSchedule3.endTime = 12;
  doctorSchedule3.isDayOff = false;

  const nurseSchedule1 = new WorkingSchedule();
  nurseSchedule1.staff = nurse;
  nurseSchedule1.dayOfWeek = 2; // Tuesday
  nurseSchedule1.startTime = 9;
  nurseSchedule1.endTime = 17;
  nurseSchedule1.isDayOff = false;

  const nurseSchedule2 = new WorkingSchedule();
  nurseSchedule2.staff = nurse;
  nurseSchedule2.dayOfWeek = 4; // Thursday
  nurseSchedule2.startTime = 9;
  nurseSchedule2.endTime = 17;
  nurseSchedule2.isDayOff = false;

  await AppDataSource.manager.save([
    doctorSchedule1,
    doctorSchedule2,
    doctorSchedule3,
    nurseSchedule1,
    nurseSchedule2,
  ]);

  console.log('✅ Seeded staff and working schedule data successfully!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error while seeding staff data:', err);
});