const db = require('../data/dbConfig');

// {
//   start:"calamada",
//   totalCars:30,
//   noha:15,
//   vitz:10,
//   probox:5,
//   totalSchedule:30,
//   percentageSchedule:10
// }

exports.find = async () => {
  const schedules = await db('schedules as s')
    .select(
      'r.start',
      db.raw('COUNT(*) as totalCars'),
      db.raw('SUM(CASE WHEN c.carType = "noha" THEN 1 ELSE 0 END) as noha'),
      db.raw('SUM(CASE WHEN c.carType = "vitz" THEN 1 ELSE 0 END) as vitz'),
      db.raw('SUM(CASE WHEN c.carType = "probox" THEN 1 ELSE 0 END) as probox'),
      db.raw('COUNT(DISTINCT s.id) as totalSchedule'),
    )
    .join('routes as r', 's.routeId', 'r.id')
    .join('drivers as d', 's.driverId', 'd.id')
    .join('cars as c', 'd.id', 'c.driverId')
    .groupBy('r.start');

  const totalSchedules = schedules.reduce(
    (total, schedule) => total + schedule.totalSchedule,
    0,
  );
  const percentageSchedule = (totalSchedules / schedules.length) * 100;

  const summaryReports = schedules.map(schedule => ({
    start: schedule.start,
    totalCars: schedule.totalCars,
    noha: schedule.noha,
    vitz: schedule.vitz,
    probox: schedule.probox,
    totalSchedule: schedule.totalSchedule,
    percentageSchedule: (schedule.totalSchedule / totalSchedules) * 100,
  }));

  return { summaryReports, totalSchedules };
};

// const now = new Date();

// const schedules = await db('schedules as s');
// // ... (rest of your query logic)

// // Update the schedules table with the last run time
// await db('schedules').update({ lastRunTime: now });

// const now = new Date();
// const twoDaysInMs = 1000 * 60 * 60 * 24 * 2; // Milliseconds in 2 days

// let lastRunTime;
// try {
//   // Try to retrieve the last run time from the database
//   lastRunTime = await db('schedules').select('lastRunTime').first();
//   lastRunTime = lastRunTime?.lastRunTime; // Handle potential null value
// } catch (error) {
//   console.error('Error fetching last run time:', error);
//   // Handle error gracefully (e.g., continue fetching data)
// }

// if (lastRunTime && now - lastRunTime < twoDaysInMs) {
//   console.log('Using previously generated report (within 2 days)');
//   return { summaryReports }; // Return the existing report
// } else {
//   // Fetch data and generate a new report as usual
//   // ... (rest of your existing code)
// }
