import { Joi, validate as ExpressValidation } from "express-validation";
import { Types } from "mongoose";

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const createBoardSchema = Joi.object({
  title: Joi.string().required().min(3),
  isPublic: Joi.boolean().required(),
  cover: Joi.string().uri().optional(),
  description: Joi.string().optional(),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().optional().min(3),
  isPublic: Joi.boolean().optional(),
  cover: Joi.string().uri().optional(),
  description: Joi.string().optional(),
});

export const createInviteSchema = Joi.object({
  email: Joi.string().required().email(),
});

export const createListSchema = Joi.object({
  title: Joi.string().required(),
  boardId: Joi.string().required().custom(objectId),
});

export const updateListSchema = Joi.object({
  title: Joi.string().optional(),
  boardId: Joi.string().optional().custom(objectId),
});

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  order: Joi.number().required(),
  cover: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  listId: Joi.string().required().custom(objectId),
  boardId: Joi.string().required().custom(objectId),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  order: Joi.number().optional(),
  cover: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  listId: Joi.string().optional().custom(objectId),
});

export const createLabelSchema = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().required(),
  boardId: Joi.string().required().custom(objectId),
});

export const queryObjectId = (fields: string[]) => {
  let schema: Record<string, any> = {};

  fields.forEach((v) => (schema[v] = Joi.string().required().custom(objectId)));

  return Joi.object(schema);
};

export const validate = (bodySchema: any) =>
  ExpressValidation(
    { body: bodySchema },
    { keyByField: true },
    { abortEarly: false }
  );

export const validateQueryIds = (...fields: string[]) => {
  return ExpressValidation(
    { query: queryObjectId(fields) },
    { keyByField: true },
    { abortEarly: false }
  );
};

function objectId(v: any, h: any) {
  if (!Types.ObjectId.isValid(v)) {
    return h.message(`Invalid objectId string`);
  }

  return v;
}
