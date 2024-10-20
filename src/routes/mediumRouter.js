const { fetchArticles, getOneArticle } = require("../controllers/mediumController");

const express = require('express');


const blogRouter = express.Router();

blogRouter.get('/articles', fetchArticles);
blogRouter.get('/article/:id', getOneArticle);

module.exports = {
    blogRouter
}