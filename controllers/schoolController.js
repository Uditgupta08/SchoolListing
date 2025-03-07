const School = require('../models/school');

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = angle => (angle * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Latitude and longitude must be numbers.' });
    }

    const newSchool = { name, address, latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
    const result = await School.addSchool(newSchool);

    res.status(201).json({ message: 'School added successfully!', schoolId: result.insertId });
  } catch (error) {
    console.error("Error in addSchool:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: 'User latitude and longitude are required as query parameters.' });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);
    if (isNaN(userLat) || isNaN(userLon)) {
      return res.status(400).json({ error: 'Latitude and longitude must be valid numbers.' });
    }

    const schools = await School.getAllSchools();
    const sortedSchools = schools.map(school => ({
      ...school,
      distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    res.json({ schools: sortedSchools });
  } catch (error) {
    console.error("Error in listSchools:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { addSchool, listSchools };
