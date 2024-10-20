const cron = require('node-cron');
const axios = require('axios');
const { MEDIUM_USER, GET_ARTICLES } = require('../../base');
const { mediumOptions } = require('../utils/apiCalls');
const { getBlog, createBlog } = require('../services/blogService');

// Cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Fetching latest posts from Medium...');
    
    const response = await axios.request(mediumOptions(GET_ARTICLES));
    const articles = response.data.associated_articles;

    // iterate over articles
    articles.forEach(async (id) => {
        //check for existence in the db
        const isExisting = await getBlog(id);
        if (isExisting) {
            console.log({
                message: "This article already exists in DB"
            })
            return {
                status: "success",
                message: "This article already exists in DB"
            }
        }

        // else fetch blog content and info using id
        const content = await axios.request(mediumOptions(`https://medium2.p.rapidapi.com/article/${id}/html`));
        const articleInfo = await axios.request(mediumOptions(`https://medium2.p.rapidapi.com/article/${id}`));

        const { title, subtitle, published_at, last_modified_at, image_url, reading_time, } = articleInfo.data;
        const readDuration = Math.ceil(reading_time);
        
        const data = {
            title,
            author: 'Raven',
            article_id: id,
            image_url: image_url,
            read_duration: `${readDuration} min`,
            last_modified_at,
            content: `${content.data.html}`,
            published_at,
        }

        // create payload and log to db
        const blog = await createBlog(data);
        if (!blog) {
            console.log({mesage: "Error in creating blog"})
            return { mesage: "Error in creating blog"}
        }
        // return success message
        return {
            status: 'success',
            message: 'Article created successfully'
        }
    });
    
    return {
        message: 'No articles found!!'
    }

  } catch (error) {
    console.error('Error fetching posts from Medium:', error);
  }
});
