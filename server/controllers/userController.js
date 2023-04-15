const { User, Thought} = require('../models')

module.exports = {
    async getUsers(req, res){
        try{
        const users = await User.find()
        res.json(users)
        }
        catch(err){
            res.status(500).json(err)
        }
    },

    async getUser(req, res){
        try{
            const user = await User.find({_id: req.params.id})
            
            if (!user) return res.status(404).json({message: 'No user with that ID'})

            res.json(user)
        }
        catch(err){
            res.status(500).json(err)
        }
    },

    async postUser(req, res){
        try{
            const user = await User.create(req.body)
            res.json(user)
        }
        catch(err){
            res.status(500).json(err)
        }
    },

    async updateUser(req, res){
        try{
            const user = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true, runValidators: true}
            );
            if (!user) return res.status(404).json({message: 'No user with that ID'});

            res.json(user)
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res){
        try{
            const user = await User.findOneAndRemove({_id: req.params.id});
            
            if (!user) return res.status(404).json({message: 'No user with that ID'});

            const result = await Thought.deleteMany({_id: {$in: user.thoughts}});
            res.json(result)
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    async newFriend(req, res){
        try{
            const user = await User.findOne({_id: req.params.id});
            if (!user) return res.status(404).json({message: 'No user with that ID'});

            const friend = await User.findOne({_id: req.params.friendId});
            if (!friend) return res.status(404).json({message: 'No friend with that ID'});

            if(user.friends.some((friendId) => friendId.equals(friend._id))) return res.status(400).json({message: 'They are already your friend'});
        
            const result = await User.findByIdAndUpdate(user._id, {
                $push: {friends: friend}
            });
            res.json(result);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res){
        try{
            const user = await User.findOne({_id: req.params.id});
            if (!user) return res.status(404).json({message: 'No user with that ID'});

            const friend = await User.findOne({_id: req.params.friendId});
            if (!friend) return res.status(404).json({message: 'No friend with that ID'});

            if(user.friends.some((friendId) => friendId.equals(friend._id))){
                const reaction = await User.findOneAndUpdate({_id: req.params.id}, {$pull: { friends: friend._id}}, { new: true })
                return res.json(reaction)
            }
            res.status(400).json({message: "This friend was not on your friend's list"})
        }
        catch(err){
            res.status(500).json(err);
        }
    }
}