const Blog = require("../models/blog.model");


const createBlog = async (data) => {
    const result = await Blog.query().insert(data);
    return result;
};

const getBlogById = async (id) => {
    const result = await Blog.query().findById(id);
    return result;
};

const getBlog = async (article_id) => {
    const results = await Blog.query().findOne({ article_id });
    return results;
}
const getAllBlogs = async (offset, limit) => {
    return await Blog.query().offset(offset).limit(limit);
};

const getBlogCount = async () => {
    return await Blog.query().resultSize();  // Returns the total number of rows
};

const updateBlog = async (article_id, data) => {
    const result = await Blog.query().where('article_id', article_id).patch(data);
    return result;
};

const findByIdAndUpdate = async (data, id) => {
    const result = await Blog.query().patchAndFetchById(id, data);
    return result;
};

module.exports = {
    createBlog,
    getBlog,
    getBlogById,
    updateBlog,
    findByIdAndUpdate,
    getAllBlogs,
    getBlogCount
}