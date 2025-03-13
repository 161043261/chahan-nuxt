// server/api/hello.ts
export default defineEventHandler((event) => {
  return { hello: 'Nitro' }
  // return JSON.stringify({ hello: "Nitro" });
  // return Promise.resolve("Nitro");
  // event.node.res.end({ hello: "Nitro" }); return;
})
