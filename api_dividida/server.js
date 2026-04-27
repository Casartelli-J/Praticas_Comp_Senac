import { createApp } from "./app.js";

const app = createApp();

app.listen(3000, () =>{
    console.log("Servidor rodando em localhost:3000")
})