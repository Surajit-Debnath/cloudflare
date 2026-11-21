import { Hono } from "hono";
type CloudflareBindings={
  CACHE1:KVNamespace
}
const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/:username", async(c) =>{
  const username=c.req.param("username");
  const chachedResp= await c.env.CACHE1.get(username);
  if(chachedResp){
    return c.json(chachedResp);
  }
  const resp=await fetch(`https://api.github.com/users/${username}/repos`,{
    headers:{
      "User-Agent":"CF-Worker"
    }
  })
  const data=await resp.json();
  await c.env.CACHE1.put(username,JSON.stringify(data));
  return c.json(data);
});

export default app;
