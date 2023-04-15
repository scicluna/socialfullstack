const router = require('express').Router()
const {getThoughts, getThought, postThought, updateThought, deleteThought, postReaction, deleteReaction} = require('../../controllers/thoughtController')

router.route('/')
    .get(getThoughts)
    .post(postThought)

router.route('/:id')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:id/reactions')
    .post(postReaction)

router.route('/:id/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router;

// TO POST A THOUGHT
// {
//     "thoughtText": "Here's a cool thought...",
//     "userName": "lernantino",
// }

// TO EDIT A THOUGHT
// {
//      "thoughtText": "edit text"
// }

// TO POST A REACTION
// {
//      "userName": "Grady",
//      "reactionBody": "TEST REACTION"
// }
