import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET ALL
export async function getAllData(table) {
  try {
    const result = await prisma[table].findMany();
    return result;
  } catch (error) {
    console.error(`${table} tablosundan veri çekme hatası:`, error);
    return { error: error.message };
  }
}

// GET BY ID
export async function getDataById(table, id) {
  try {
    const result = await prisma[table].findUnique({
      where: { id },
    });
    return result;
  } catch (error) {
    console.error(`${table} tablosundan veri çekme hatası:`, error);
    return { error: error.message };
  }
}

// GET BY MANY
export async function getDataByMany(table, where) {
  try {
    const result = await prisma[table].findMany({
      where,
    });
    return result;
  } catch (error) {
    console.error(`${table} tablosundan veri çekme hatası:`, error);
    return { error: error.message };
  }
}

// CREATE
export async function createNewData(table, data) {
  try {
    const result = await prisma[table].create({
      data,
    });
    return result;
  } catch (error) {
    console.error(`${table} tablosuna veri ekleme hatası:`, error);
    return { error: error.message };
  }
}

// UPDATE
export async function updateData(table, id, data) {
  try {
    const result = await prisma[table].update({
      where: { id },
      data,
    });
    return result;
  } catch (error) {
    console.error(`${table} tablosunda güncelleme hatası:`, error);
    return { error: error.message };
  }
}

// DELETE
export async function deleteData(table, id) {
  try {
    const result = await prisma[table].delete({
      where: { id },
    });
    return result;
  } catch (error) {
    console.error(`${table} tablosunda silme hatası:`, error);
    return { error: error.message };
  }
}

// DELETE MANY
export async function deleteDataByMany(table, where) {
  try {
    const result = await prisma[table].deleteMany({
      where,
    });
    return result;
  } catch (error) {
    console.error(`${table} tablosunda toplu silme hatası:`, error);
    return { error: error.message };
  }
}

// DELETE ALL
export async function deleteDataAll(table) {
  try {
    const result = await prisma[table].deleteMany();
    return result;
  } catch (error) {
    console.error(`${table} tablosunda tüm verileri silme hatası:`, error);
    return { error: error.message };
  }
}

// Toplu export su an kullanilmiyor fakat action.js icinde bu cagirilabilir
export default {
  getAllData,
  getDataById,
  getDataByMany,
  createNewData,
  deleteDataByMany,
  deleteDataAll,
  updateData,
  deleteData,
};
