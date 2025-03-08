const db = require('../config/db');

const createTable = async () => {
  console.log("Creating schools table if not exists...");
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    )
  `;
  try {
    await db.execute(createTableQuery);
    console.log("Schools table has been created or already exists.");
  } catch (error) {
    console.error("Error creating schools table:", error);
  }
};

const addSchool = async ({ name, address, latitude, longitude }) => {
  console.log("Adding new school:", name);
  try {
    const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    const [result] = await db.execute(query, [name, address, latitude, longitude]);
    console.log("School added successfully with ID:", result.insertId);
    return result;
  } catch (error) {
    console.error("Error adding school:", error);
    throw error;
  }
};

const getAllSchools = async () => {
  console.log("Fetching all schools...");
  try {
    const query = "SELECT * FROM schools";
    const [rows] = await db.execute(query);
    console.log("Fetched schools:", rows.length);
    return rows;
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
};

module.exports = { createTable, addSchool, getAllSchools };