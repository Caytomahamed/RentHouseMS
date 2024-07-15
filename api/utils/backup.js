const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Define the path to your database and backup directory
const databasePath = path.join(__dirname, 'data/rentHousesMs.db3');
const backupDir = path.join(__dirname, 'backups');

// Ensure the backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// Define the backup file name with timestamp
const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
const backupFile = path.join(backupDir, `backup-${timestamp}.db3`);

// Execute the command to backup the database
const command = `sqlite3 ${databasePath} ".backup '${backupFile}'"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error creating backup: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Backup stderr: ${stderr}`);
    return;
  }
  console.log(`Backup created successfully: ${backupFile}`);
});
