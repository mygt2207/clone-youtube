import { z } from 'zod';

const nonEmptyString = z.string().trim().min(1);

export const schema = z.object({
  JWT_SECRET: nonEmptyString,
});

export const env = schema.parse(process.env);
