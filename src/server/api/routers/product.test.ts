// import { expect, test, vi, describe, beforeEach } from "vitest";
// import { createInnerTRPCContext } from "../trpc";
// import { productRouter } from "./product";
// import type { AppRouter } from "../root";
// import type { inferProcedureInput } from "@trpc/server";
// import db from "~/server/__mocks__/db";

// // Mock prisma module
// vi.mock("../../db");

// describe("Product router", () => {
//   test("Create & fetch product", async () => {
//     beforeEach(() => {
//       vi.restoreAllMocks();
//     });

//     // Mock session for protected procedures
//     const ctx = createInnerTRPCContext({
//       session: {
//         user: { id: "1", name: "John Doe" },
//         expires: "1",
//       },
//     });

//     const caller = productRouter.createCaller({ ...ctx, db });

//     type CreateInput = inferProcedureInput<AppRouter["product"]["create"]>;
//     const createInput: CreateInput = {
//       url: "https://www.amazon.com/Philips-Kitchen-Appliances-Technology-91/dp/B08SJ6L9MT",
//     };

//     await caller.create(createInput);

//     // console.log(product);

//     // type GetByIdInput = inferProcedureInput<AppRouter["product"]["getById"]>;
//     // const input: GetByIdInput = {
//     //   id: product.id,
//     // };
//   }, 30000);
// });

//   const fetchedProduct = await caller.getById(input);

//   expect(fetchedProduct).toMatchObject(product);
// });

import { type inferProcedureInput } from "@trpc/server";
import { expect, test } from "vitest";

import { appRouter, type AppRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

test("example router", async () => {
  const ctx = createInnerTRPCContext({ session: null });
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["example"]["hello"]>;
  const input: Input = {
    text: "test",
  };

  const example = await caller.example.hello(input);

  expect(example).toMatchObject({ greeting: "Hello test" });
});
