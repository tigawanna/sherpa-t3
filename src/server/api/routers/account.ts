import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

export const userAccountRouter = createTRPCRouter({

    getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.account.findMany({
      where: {
        userId: ctx?.session?.user.id
      }
    });
  }),

  getOne: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ ctx,input }) => {
    return ctx.db.account.findUnique({ 
      where: { 
      id: input.id,
      userId: ctx?.session?.user.id 
    }});
  }),
});



