import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Функция для создания нового тура
export const createTourService = async (tourData) => {
  return prisma.tours.create({
    data: {
      ...tourData,
      imges: {
        create: tourData.imges || [],
      },
    },
  });
};

// Функция для получения всех туров
export const getAllTours = async (filters = {}) => {
  const { country, duration } = filters;
  const durationNum = Number(duration);

  return await prisma.tours.findMany({
    where: {
      title: country ? { contains: country } : undefined,
      ...(durationNum
        ? {
            duration_min: { lte: durationNum },
            duration_max: { gte: durationNum },
          }
        : {}),
    },
    include: {
      imges: true,
    },
  });
};

// Функция для получения тура по id
export const getByIdTour = async (id) => {
  try {
    const idNumber = parseInt(id, 10);

    const tour = await prisma.tours.findUnique({
      where: { id: idNumber },
      include: {
        imges: true,
      },
    });

    if (!tour) {
      return null;
    }
    return tour;
  } catch (error) {
    console.error("Ошибка при получении тура:", error);
    throw error;
  }
};

// Функция для обновления тура
export const updateTourService = async (id, tourData) => {
  return prisma.tours.update({
    where: { id: Number(id) },
    data: {
      ...tourData,
      imges: tourData.imges
        ? {
            deleteMany: {},
            create: tourData.imges.map((img) => ({ image_url: img.image_url })),
          }
        : undefined,
    },
    include: {
      imges: true,
    },
  });
};

// Функция для удаления тура
export const deleteTourService = async (id) => {
  return await prisma.tours.delete({
    where: { id: Number(id) },
  });
};

//  Функция для получения аэропортов
export const getAirportsByCity = async (cityName) => {
  try {
    const city = await prisma.city.findFirst({
      where: { name: cityName },
      include: { airports: true },
    });
    if (!city) return null;

    return city.airports;
  } catch (err) {
    console.error("Ошибка при получении аэропортов:", err);
    throw err;
  }
};

// Фукция входа в админку
export const loginAdminService = async (username, password) => {
  const admin = await prisma.admins.findUnique({
    where: { username },
  });

  if (!admin) throw new Error("Неверный логин или пароль");

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error("Неверный логин или пароль");

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  return { token };
};
