import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const userRouter = createTRPCRouter({

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.user.findMany({});
    }),

    getOne: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.user.findUnique({
                where: {
                    id: ctx?.session?.user.id
                }
            });
        }),
});



