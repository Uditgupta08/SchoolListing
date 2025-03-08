const School = require('../models/school');

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  console.log("Calculating distance between coordinates:", lat1, lon1, lat2, lon2);
  const toRad = angle => (angle * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  console.log("Calculated distance:", distance);
  return distance;
};
const addSchool = async (req, res) => {
  console.log("Received request to add school:", req.body);
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || latitude === undefined || longitude === undefined) {
    console.log("Validation failed: Missing fields");
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (isNaN(latitude) || isNaN(longitude)) {
    console.log("Validation failed: Invalid coordinates");
    return res.status(400).json({ error: 'Latitude and longitude must be numbers.' });
  }

  try {
    console.log("Inserting school into database...");
    const results = await School.addSchool({ 
      name, 
      address, 
      latitude: parseFloat(latitude), 
      longitude: parseFloat(longitude) 
    });

    console.log("School successfully added with ID:", results.insertId);
    return res.status(201).json({ message: 'School added successfully!', schoolId: results.insertId });
  } catch (err) {
    console.error("Error inserting school:", err);
    return res.status(500).json({ error: 'Database error' });
  }
};

const listSchools = async (req, res) => {
  console.log("Received request to list schools with user location:", req.query);
  const { latitude, longitude } = req.query;  
  if (latitude === undefined || longitude === undefined) {
    console.log("Validation failed: Missing user coordinates");
    return res.status(400).json({ error: 'User latitude and longitude are required as query parameters.' });
  }
  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    console.log("Validation failed: Invalid user coordinates");
    return res.status(400).json({ error: 'User latitude and longitude must be valid numbers.' });
  }

  try {
    console.log("Fetching all schools from database...");
    const schools = await School.getAllSchools();

    console.log("Fetched", schools.length, "schools. Sorting by distance...");
    const sortedSchools = schools.map(school => ({
      ...school,
      distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    console.log("Sorted schools successfully.");
    return res.json({ schools: sortedSchools });
  } catch (err) {
    console.error("Error fetching schools:", err);
    return res.status(500).json({ error: 'Database error' });
  }
};

module.exports = { addSchool, listSchools };
