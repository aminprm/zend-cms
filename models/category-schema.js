// MongoDB schema
let category_schema = new mongoose.Schema({

    title : {type : String, unique : true},
    row : Number,
    parent : {
        type : 'ObjectId',
        ref : 'category'
    }

});

category_schema.statics = {

    add : async function (title_inp, parent_inp) {

        let list = await category_model.find();
        let parent = parent_inp;

        if(parent_inp == '0'){

            parent = null;

        }
        else if(!isObjectId(parent_inp)){

            return -1;

        }

        let new_category = new category_model({

            title : title_inp,
            row : list.length + 1,
            parent : parent

        });
        
        return await new_category.save();

    },

    get : async function () {

        return await category_model.find({

            parent : null

        });

    },

    getSub : async function (parent_id) {

        return await category_model.find({

            parent : parent_id

        });

    },

    getAll : async function () {

        return await category_model.find().populate('parent');

    },

    del : async function (category_id) {

        return await category_model.findByIdAndDelete(category_id);

    }

};



module.exports = category_model = mongoose.model('category', category_schema);