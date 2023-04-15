const connection = require('../config/connection')
const {User, Thought} = require('../models')
const { Types } = require('mongoose');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [
        {userName: 'Bob', email: 'bob@bob.com'},
        {userName: 'Bill', email: 'bill@bill.com'},
        {userName: 'James', email: 'james@james.com'},
        {userName: 'Mary', email: 'mary@mary.com'},
        {userName: 'Jill', email: 'jill@jill.com'},
        {userName: 'Joe', email: 'joe@joe.com'},
        {userName: 'Nick', email: 'nick@nick.com'},
        {userName: 'Beatriz', email: 'beatriz@beatriz.com'},
        {userName: 'Tommy', email: 'tommy@tommy.com'},
        {userName: 'Nathan', email: 'nathan@nathan.com'},
        {userName: 'Ben', email: 'ben@ben.com'},
        {userName: 'Nikky', email: 'nikky@nikky.com'},
        {userName: 'KD', email: 'kd@kd.com'},
        {userName: 'Damian', email: 'damian@damian.com'},
        {userName: 'Brad', email: 'brad@brad.com'},
        {userName: 'Grady', email: 'grady@grady.com'},
        {userName: 'Raman', email: 'raman@raman.com'},
        {userName: 'Ryan', email: 'ryan@ryan.com'}
    ];

    await User.collection.insertMany(users)
    console.log('Users Created!')

    const getRandomUserName = (users) => {
        const rng = Math.floor(Math.random()*users.length)
        return users[rng].userName
    }

    const getRandomReactions = (maxReactions) => {
        const reactionCount = Math.floor(Math.random()*maxReactions)

        const reactions = [
            {reactionBody: 'Cool!', userName: getRandomUserName(users)},
            {reactionBody: 'Bad!', userName: getRandomUserName(users)},
            {reactionBody: 'Amazing!', userName: getRandomUserName(users)},
            {reactionBody: 'Great!', userName: getRandomUserName(users)},
            {reactionBody: 'Love it!', userName: getRandomUserName(users)},
            {reactionBody: 'Hate it!', userName: getRandomUserName(users)},
            {reactionBody: 'Fantastic!', userName: getRandomUserName(users)},
            {reactionBody: 'Nice!', userName: getRandomUserName(users)},
            {reactionBody: 'Sweet!', userName: getRandomUserName(users)},
            {reactionBody: 'Ew!', userName: getRandomUserName(users)},
        ]

        const randomReactions = []

        for (let i=0; i<reactionCount; i++){
            const randomIndex = Math.floor(Math.random()* reactions.length)
            const reaction = { ...reactions[randomIndex], _id: new Types.ObjectId() };
            randomReactions.push(reaction)
        }

        return randomReactions
    }
    
    const thoughts = [
        {thoughtText: 'hello world!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello guys!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello people!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello country!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello computer!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello music!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello test!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello yellow!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello mello!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello water!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello weather!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello today!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello yesterday!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello tomorrow!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello future!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello past!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello present!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello users!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello thoughts!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello reactions!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello cyberpunk!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello darkness!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello light!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello noon!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello june!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello moon!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello tune!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello phone!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello tone!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello booze!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello slack!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
        {thoughtText: 'hello mac!', userName: getRandomUserName(users), reactions: getRandomReactions(5)},
    ]

    await Thought.collection.insertMany(thoughts)

    //seed user thoughts
    for (const thought of thoughts){
        const user = await User.findOne({userName: thought.userName});

        await User.findByIdAndUpdate(user._id, {
            $push: {thoughts: thought}
        });
    }

    //seed user friends
    for (const user of users){

        const rng = Math.floor(Math.random()*5);

        for (let i=0; i<rng; i++){

            let friendName;
            while(friendName == user.userName || !friendName){
                friendName = getRandomUserName(users);
            }
    
            const editUser = await User.findOne({userName: user.userName});
            const friend = await User.findOne({userName: friendName});

            if(!editUser.friends || !editUser.friends.some(id => id?.equals(friend._id))){
                await User.findByIdAndUpdate(editUser._id, {
                    $push: {friends: friend}
                });
            }
        }
    }

    console.table(users);
    console.table(thoughts)
    console.info('Seeding complete! 🌱');
    process.exit(0);
});