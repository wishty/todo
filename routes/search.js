const { Router } = require('express');
const router = Router();
const { Post }  = require('../models');


router.get('/', (req, res)=>{
  const condition = [
    {
      $search: {
        index: 'titleSearch',
        text: {
          query: req.query.word,
          path: ['title', 'content']
        }
      }
    },
    { $sort : { createdAt : -1}},
    // { $limit : 10 },
    // { $project : { title: 1, dueDate: 1, _id: 1, score: { $meta: "searchScore" }}}
  ]
  Post.aggregate(condition, (err, result)=>{
    console.log(result)
    res.render('list.ejs', {posts : result})
  })
})


module.exports = router;