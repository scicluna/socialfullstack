const router = require('express').Router()
const {getUsers, getUser, postUser, updateUser, deleteUser, newFriend, removeFriend} = require('../../controllers/userController')

router.route('/')
    .get(getUsers)
    .post(postUser)

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/:id/friends/:friendId')
    .post(newFriend)
    .delete(removeFriend)

module.exports = router;

//POST USER / PUT USER
// {
//      "username": "lernantino",
//      "email": "lernantino@gmail.com"
// }
