const router = express.Router();

router.get('/:id', async(req,res)=>{

    try{

        let product_id = req.params.id;

        if(!product_id || !isObjectId(product_id)){
            return res.redirect(`${config.backend_url}store/list`);
        }

        let edit_product = await product_model.getById(product_id);
        backend.locals.product_form = edit_product;

        let data = {

            list : await category_model.get(),

        }

        res.render('store/store-edit', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/:id', async(req,res)=>{

    try{

        let product_id = req.params.id;
        let {title_inp, parent_inp, child_inp, describe_inp, price_inp, stock_inp, discount_inp} = req.body;
        let product_features_inp = req.body['product_features_inp[]'];

        let valid_title = validation.isSafe(title_inp);
        let valid_parent = isObjectId(parent_inp);
        let valid_child = isObjectId(child_inp);
        let valid_describe = validation.isSafe(describe_inp);
        let valid_price = validation.isSafe(price_inp);
        let valid_stock = validation.isSafe(stock_inp);
        let valid_discount = validation.isSafe(discount_inp);
        let valid_product_features = [];

        for(let i = 0; i < product_features_inp.length; i++){

            valid_product_features[i] = validation.isSafe(product_features_inp[i]);

        }

        if(valid_title != ''){
            return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=${valid_title}`);
        }
        else if(!valid_parent){
            return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=invalid-input`);
        }
        else if(!valid_child){
            return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=invalid-input`);
        }
        else if(valid_describe != ''){
            return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=${valid_describe}`);
        }
        else if(valid_stock != ''){
            return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=${valid_stock}`);
        }
        else if(valid_discount != ''){
            return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=${valid_discount}`);
        }
        else if(valid_price != ''){
            return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=${valid_price}`);
        }
        else if(!valid_product_features.includes('')){
            return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=${valid_product_features[0]}`);
        }

        let last_product = await product_model.getById(product_id);

        let new_product = {

            title : title_inp,
            category : parent_inp,
            sub_category : child_inp,
            describe : describe_inp,
            stock : stock_inp,
            price : price_inp,
            discount : discount_inp,
            features : product_features_inp,
            last_edit : getCurrentDate(),
            author : req.session.admin_id,
            images : last_product.images

        };

        if(req.files.product_main_image){

            let main_image = req.files.product_main_image;
            let product_images = [];

            let file_format1 = main_image.name.slice(-3).toLowerCase();
            let file_format2 = main_image.name.slice(-4).toLowerCase();

            if(backend_allowd_avatars.includes(file_format1) || backend_allowd_avatars.includes(file_format2)) {

                if(main_image.size/1024 <= backend_limited_products_size){

                    let _name = `${product_id}_main.png`;
                    let main_image_path = `${backend_upload_dir}products/${_name}`;
                    main_image.mv(main_image_path, (err)=>{});
                    product_images.push(`${_name}`);

                }
                else{

                    return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=limited-image`);

                }

            }
            else{

                return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=illegal-image`);

            }

            new_product['images'][0] = product_images;

        }

        let result = await product_model.edit(product_id, new_product);

        if(result){

            return res.redirect(`${config.backend_url}store/list/?msg=edit-success`);

        }
        else{

            return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=edit-fail`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;