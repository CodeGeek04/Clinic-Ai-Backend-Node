const { db } = require("../prisma/db");
const getCoordinates = require("../utils/getCoordinates");

const addClinic = async (mobile, name, email, address, mapUrl) => {
  const coordinates = await getCoordinates(address);

  try {
    const clinic = await db.clinic.create({
      data: {
        mobile,
        name,
        email,
        address,
        mapUrl,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    });
    return clinic;
  } catch (error) {
    return error;
  }
};

const getClinics = async () => {
  try {
    const clinics = await db.clinic.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        mapUrl: true,
      },
    });
    return clinics;
  } catch (error) {
    return error;
  }
};

const getClinic = async (id) => {
  try {
    const clinic = await db.clinic.findUnique({
      where: {
        id,
      },
    });
    return clinic;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addClinic,
  getClinics,
  getClinic,
};
