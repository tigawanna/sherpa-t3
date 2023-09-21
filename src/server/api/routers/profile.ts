import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const UserProfileSchema = z.object({
  id: z.string(),
  // createdAt: z.string().optional(),
  // updatedAt: z.string().optional(),
  email: z.string().email(),
  name: z.string(),
  about_me: z.string(),
  github_username: z.string(),
  linkedin_username: z.string(),
  image_url: z.string(),
  country: z.string(),
  city: z.string(),
  phone: z.string(),
  skills: z.array(z.string()),
  // Project: z.array(ProjectSchema).optional(),
  // JobApplication: z.array(JobApplicationSchema).optional(),
});

export type UserProfileInputType = z.infer<typeof UserProfileSchema>;

export const userProfileRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.account.findMany();
  }),

  getOne: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ ctx,input }) => {
    return ctx.db.account.findUnique({ where: { id:input.id }});
  }),




});



