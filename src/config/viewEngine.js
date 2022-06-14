import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public")) // chỉ đc lấy ảnh ở đây
    app.set("view engine", "ejs") // gioosng jinja trong django
    app.set("views", "./src/views")
}

module.exports = configViewEngine;