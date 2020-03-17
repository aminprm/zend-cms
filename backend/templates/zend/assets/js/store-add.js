function storeAddError() {
    var error_text = document.getElementById('store_add_error');
    var title_inp = document.forms['store_add_form']['title_inp'].value;
    var parent_inp = document.forms['store_add_form']['parent_inp'].value;
    var child_inp = document.forms['store_add_form']['child_inp'].value;
    var describe = document.forms['store_add_form']['describe'].value;
    var price_inp = document.forms['store_add_form']['price_inp'].value;
    var inventory_inp = document.forms['store_add_form']['inventory_inp'].value;
    var Discount_inp = document.forms['store_add_form']['Discount_inp'].value;

        if ( title_inp === "")
        {

            error_text.style.display = "block";
            error_text.innerHTML = "لطفا عنوان محصول را انتخاب کنید";
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            return false;

        }

        else if (parent_inp === "")
        {

            error_text.style.display = "block";
            error_text.innerHTML = "لطفا دسته را انتخاب کنید";
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            return false;

        }

        else if (child_inp === "0")
        {

            error_text.style.display = "block";
            error_text.innerHTML = "لطفا زیر دسته را انتخاب کنید";
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            return false;

        }

        else if (describe === "")
        {

            error_text.style.display = "block";
            error_text.innerHTML = "لطفا توضیحات محصول را بنویسید";
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            return false;

        }
        

        else if (price_inp === "")
        {

            error_text.style.display = "block";
            error_text.innerHTML = "لطفا قیمت محصول را وارد کنید";
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            return false;

        }

        else if (inventory_inp === "")
        {

            error_text.style.display = "block";
            error_text.innerHTML = "لطفا موجودی انبار را وارد کنید";
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            return false;

        }

        else if (Discount_inp === "")
        {

            error_text.style.display = "block";
            error_text.innerHTML = "لطفا تخفیف را وارد کنید";
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            return false;

        }

}   

$(document).ready(function(){

    let maxField = 10;
    let addButton = $('.add_button');
    let wrapper = $('.field_wrapper');
    let fieldHTML = '<div class="main_field_of_add_inp"><input class="form-control add_form_class" name="product_features[]" type="text" value=""/><a href="javascript:void(0);" class="remove_button"><i class="fas fa-minus mt-2"></i></a></div>';
    let x = 1;

    $(addButton).click(function(){

        if(x < maxField){ 

            x++;
            $(wrapper).append(fieldHTML);

        }

    });

    $(wrapper).on('click', '.remove_button', function(e){

        e.preventDefault();
        $(this).parent('div').remove();
        x--;

    });

});