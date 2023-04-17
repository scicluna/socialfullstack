const router = require('express').Router()
const { getUsers, getUser, postUser, updateUser, deleteUser, newFriend, removeFriend, userLogin, userSignup } = require('../../controllers/userController')

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

router.route('/login')
    .post(userLogin)

router.route('/signup')
    .post(userSignup)

module.exports = router;

//POST USER / PUT USER
// {
//      "username": "lernantino",
//      "email": "lernantino@gmail.com"
// }
