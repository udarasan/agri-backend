const router = require('express').Router();
const { Post, Reply } = require('../model/post');
const verify = require('../middleware/verifyToken');

// GET all posts
router.get('/posts', verify,async (req, res) => {
    try {
        const posts = await Post.find().populate('replies').sort('-createdAt');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific post
router.get('/posts/:id', verify, async (req, res) => {
    try {
        console.log(req.params.id)
        const posts = await Post.find({category:req.params.id}).populate('replies').sort('-createdAt');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a new post
router.post('/addPost', verify,async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        category: req.body.category
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a post
router.patch('/posts/:id', getPost, async (req, res) => {
    if (req.body.title != null) {
        res.post.title = req.body.title;
    }

    if (req.body.content != null) {
        res.post.content = req.body.content;
    }

    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a post
router.delete('/posts/:id', getPost, async (req, res) => {
    try {
        await res.post.remove();
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all replies for a post
router.get('/posts/:id/replies', getPost, async (req, res) => {
    try {
        const replies = await Reply.find({ post: req.params.id }).populate('author');
        res.json(replies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a new reply for a post
router.post('/reply', verify, async (req, res) => {
    const reply = new Reply({
        content: req.body.content,
        author: req.body.author,
        post: req.body.post,
    });

    try {
        const newReply = await reply.save();
        const UniquePost = await Post.findOne({_id:req.body.post})
        UniquePost.replies.push(reply)
        await UniquePost.save()
        res.status(201).json(newReply);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware function to get a specific post by ID
async function getPost(req, res, next) {
    let post;

    try {
        post = await Post.findById(req.params.id).populate('author').populate('replies');
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.post = post;
    next();
}

module.exports = router;