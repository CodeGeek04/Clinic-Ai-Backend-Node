const { db, user } = require("../prisma/db");
const crypto = require("crypto");
const getCoordinates = require("../utils/getCoordinates");

const generateRandomCode = () => {
  const code = crypto
    .randomBytes(3)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .substr(0, 6);
  return code;
};

const generateRefferalCode = () => {
  const code = generateRandomCode();
  let user = db.user.findUnique({
    where: {
      refferalCode: code,
    },
  });
  while (user) {
    code = generateRandomCode();
    user = db.user.findUnique({
      where: {
        refferalCode: code,
      },
    });
  }
  return code;
};

const addUser = async (mobile, refferedBy = null) => {
  const refferalCode = generateRefferalCode();
  try {
    if (refferedBy) {
      const user = await db.user.create({
        data: {
          mobile,
          refferedBy: {
            connect: {
              mobile,
              refferedBy,
              refferalCode,
            },
          },
        },
      });
      return user;
    } else {
      const user = await db.user.create({
        data: {
          mobile,
          refferalCode,
        },
      });
      return user;
    }
  } catch (error) {
    return error;
  }
};

const getUser = async (mobile) => {
  try {
    const user = await db.user.findUnique({
      where: {
        mobile,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
};

const updateUser = async (
  mobile,
  name = null,
  address = null,
  dob = null,
  email = null
) => {
  try {
    const data = {};
    if (name !== null) {
      data.name = name;
    }
    if (address !== null) {
      data.address = address;
      const coordinates = await getCoordinates(address);
      data.latitude = coordinates.latitude;
      data.longitude = coordinates.longitude;
    }
    if (dob !== null) {
      data.dob = dob;
    }
    if (email !== null) {
      data.email = email;
    }
    const user = await db.user.update({
      where: {
        mobile,
      },
      data,
    });
    return user;
  } catch (error) {
    return error;
  }
};

const modifyCancelCount = async (mobile, count) => {
  try {
    const user = await db.user.update({
      where: {
        mobile,
      },
      data: {
        cancelCount: count,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  modifyCancelCount,
};
