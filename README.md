<p align="center">
   <img width="150px" height="150px" src="https://github.com/L-Michael1/droprr/assets/27537005/a85844d1-fba3-4cdc-b511-163b28e74263"/>
</p>

# droprr

droprr is a web-app built for users who want to track products from Amazon. droprr will fetch and update user-tracked product prices every day, notifying the user when there is a price drop.

---

## Motivation

Often times, I noticed myself scrolling through Amazon looking at my recurring purchases to check their prices. And, I found it not only to be time-consuming, but I also didn't purchase those products at the best prices. Thus, droprr was made to solve this problem with a user-friendly UI/UX to track, untrack, and view their tracked products.

---

## Technology

I built the web-app using the T3 stack, composed of Next.js 13 (pages router), TypeScript, tRPC, Prisma, MySQL, tailwindcss, NextAuth. Additionally, I implemented Vitest to write integration tests for the tRPC calls. The CI pipeline is built with Github Actions, which builds, runs the integration tests, and also lints the project. Vercel was my choice of deployment.

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [tRPC](https://trpc.io/)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [tailwindcss](https://tailwindcss.com/)
- [NextAuth](https://next-auth.js.org/)
- [Vitest](https://vitest.dev/)

---

## Demo
![droprr](https://github.com/L-Michael1/droprr/assets/27537005/db1994df-dc98-4358-9858-cb5a13aa4e82)
