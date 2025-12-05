import * as v from 'valibot';

export const registerSchema = v.object({
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(v.string(), v.minLength(5)),
	fullName: v.string()
});

export const LoginSchema = v.object({
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(v.string(), v.minLength(5))
});

export type LoginData = v.InferOutput<typeof LoginSchema>;
export type RegisterData = v.InferOutput<typeof registerSchema>;
