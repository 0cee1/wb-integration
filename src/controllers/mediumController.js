const { default: axios } = require("axios");
const { GET_ARTICLES, MEDIUM_USER } = require("../../base");
const { mediumOptions } = require("../utils/apiCalls");
const { getAllBlogs, getBlog, getBlogCount } = require("../services/blogService");


const fetchArticles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10;  
        const offset = (page - 1) * limit; 

        const articles = await getAllBlogs(offset, limit);
        if (!articles) {
            return res.status(404).json({
                status: 'fail',
                message: 'No articles found'
            });
        }

        articles.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
        const totalArticles = await getBlogCount();  
        const totalPages = Math.ceil(totalArticles / limit); 

        res.status(200).json({
            status: 'success',
            message: 'Articles retrieved successfully',
            currentPage: page,
            totalPages: totalPages,
            totalArticles: totalArticles,
            data: articles
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'fail',
            message: 'An error occured'
        })
    }
};

const getOneArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await getBlog(id);
        if (!article) {
            return res.status(401).json({
                status: 'fail',
                message: 'Failed to get articles'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Article retrieved successfully',
            data: article
        })
        console.log('ARTICLE=============;;  ', article)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'fail',
            message: 'An error occured'
        })
    }
};

module.exports = {
    fetchArticles,
    getOneArticle
}