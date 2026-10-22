import 'dotenv/config';
import z from 'zod';

export const envSchema = z.object({
    PORT: z.coerce.number().int().default(4001),
    DB_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    CORS_ORIGIN: z.url()
});

export type Env = z.infer<typeof envSchema>;

export const env = (() => {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
        const issues = result.error.issues
            .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
            .join('\n');
        throw new Error(`Invalid environment variables:\n${issues}`);
    }

    return Object.freeze(result.data);
})();