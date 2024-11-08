const { exec } = require("child_process");

const runMigrations = async (req, res) => {
  try {
    exec(
      "npx sequelize-cli db:migrate --migrations-path src/sequelize/migrations --config src/sequelize/config/config.js",
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Migration error ${error.message}`);
          return res.status(500).json({ error: "Migration failed" });
        }
        if (stderr) {
          console.error(`Migration stderr: ${stderr}`);
          return res.status(500).json({ error: "Migration failed." });
        }
        console.log(`Migration stdout: ${stdout}`);
        res.json({
          message: "Migrations executed successfully.",
          output: stdout,
        });
      }
    );
  } catch (erorr) {
    console.log(erorr);
    res.status(500).json({ error: "Migration failed." });
  }
};

module.exports = {
  runMigrations,
};
