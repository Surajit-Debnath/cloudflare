import { Hono } from "hono";
type CloudflareBindings={
  suro:D1Database
}
const app = new Hono<{ Bindings: CloudflareBindings }>();


app.get("/movies", async(c) =>{
  const resp=await c.env.suro.prepare("select * from movies").all();
  const movies=resp.results
  return c.json(movies);
});

app.get("/favorites",async c=>{
  const resp=await c.env.suro
  .prepare("select * from movies order by rating desc limit 3")
  .all();
  const movies=resp.results;
  return c.json(movies);
})

app.put("/movies/:id",async c=>{
  const body=await c.req.json();
  const resp=await c.env.suro
  .prepare("update movies set rating =?1 where id =?2 returning *")
  .bind(body.rating,c.req.param("id"))
  .run();
  const ok=resp.success;
  return c.json({ok});
})
export default app;
