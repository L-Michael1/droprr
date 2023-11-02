import { expect, test, describe } from "vitest";
import { createInnerTRPCContext } from "../trpc";
import { productRouter } from "./product";
import type { AppRouter } from "../root";
import type { inferProcedureInput } from "@trpc/server";
import { db } from "~/server/db";

describe("Product router", () => {
  test("unauthed user should not be possible to create a product", async () => {
    const ctx = createInnerTRPCContext({ session: null });
    const caller = productRouter.createCaller(ctx);

    type CreateInput = inferProcedureInput<AppRouter["product"]["create"]>;
    const input: CreateInput = {
      url: "https://www.amazon.ca/Sony-WH-1000XM4-Canceling-Headphones-WH1000XM4/dp/B0863TXGM3?th=1",
    };

    await expect(caller.create(input)).rejects.toThrowError();
  });

  test("creating an existing product should throw an error", async () => {
    const ctx = createInnerTRPCContext({
      session: {
        user: { id: "1", name: "John Doe" },
        expires: "1",
      },
    });

    const caller = productRouter.createCaller({ ...ctx, db });

    type CreateInput = inferProcedureInput<AppRouter["product"]["create"]>;
    const input: CreateInput = {
      url: "https://www.amazon.com",
    };

    await expect(caller.create(input)).rejects.toThrowError();
  });

  test("get a product by id", async () => {
    const ctx = createInnerTRPCContext({
      session: {
        user: { id: "1", name: "John Doe" },
        expires: "1",
      },
    });

    const caller = productRouter.createCaller({ ...ctx, db });

    type GetByIdInput = inferProcedureInput<AppRouter["product"]["getById"]>;
    const input: GetByIdInput = {
      id: "1",
    };

    const product = await caller.getById(input);

    expect(product).not.toBeNull();
    expect(product?.id).toBe("1");
    expect(product?.url).toBe("https://www.amazon.com");
    expect(product?.image).toBe("image");
    expect(product?.name).toBe("Test Product");
    expect(product?.currentPrice).toBe(100);
    expect(product?.originalPrice).toBe(150);
    expect(product?.lowestPrice).toBe(50);
    expect(product?.highestPrice).toBe(200);
    expect(product?.averagePrice).toBe(125);
    expect(product?.isOutOfStock).toBe(false);
    expect(product?.currency).toBe("$");
    expect(product?.userId).toBe("1");
  });

  test("delete a product by id", async () => {
    const ctx = createInnerTRPCContext({
      session: {
        user: { id: "1", name: "John Doe" },
        expires: "1",
      },
    });

    const caller = productRouter.createCaller({ ...ctx, db });

    type DeleteInput = inferProcedureInput<AppRouter["product"]["delete"]>;
    const input: DeleteInput = {
      id: "1",
    };

    const result = await caller.delete(input);

    expect(result).toBe(true);
  });
});
