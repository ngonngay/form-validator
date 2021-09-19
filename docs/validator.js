const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);

//Validator Object
function Validator(options){
    function getParent(inputElement,selector){
        while(inputElement.parentElement){
            if(inputElement.parentElement.matches(selector)){
                return inputElement.parentElement;
            }
            inputElement=inputElement.parentElement;
        }
    }
    //Hàm thực hiện validate
    var selectorRules={};
    function validate(inputElement,rule){
        var errorElement=getParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector)
        var errorMessage;
        var rules=selectorRules[rule.selector];

        for (var i=0; i<rules.length;i++){
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                        errorMessage=rules[i](
                            formElement.querySelector(rule.selector+':checked')
                        );
                    break;
            
                default:
                    errorMessage=rules[i]((inputElement.value));
                    break;
            }
            
            if (errorMessage)break;
        }

        if (errorMessage){
            errorElement.innerText=errorMessage;
            getParent(inputElement,options.formGroupSelector).classList.add('invalid');
        }else{
            errorElement.innerText='';
            getParent(inputElement,options.formGroupSelector).classList.remove('invalid');
        }
        
        return !errorMessage;
    }
    //Lấy element
    var formElement=$(options.form);
    if (formElement){
        //Khi submit form
        formElement.onsubmit = function(e){
            e.preventDefault();
            var isFormValid =true;
            options.rules.forEach((rule)=>{
                var inputElement=formElement.querySelector(rule.selector);
                var isValid= validate(inputElement,rule);
                if (!isValid) {
                    isFormValid=false;
                }
            });
            
            if (isFormValid) {
                if (typeof options.onSubmit=="function") {
                    var enableInputs=formElement.querySelectorAll('[name]');
                    
                    var formValues=Array.from(enableInputs).reduce(function (values,input) { 
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }else{
                    //xử dụng sk submit default
                    formElement.submit();
                }
                
            }
        }
        
        //Lặp qua mỗi rukle và xử lý (lắng nghe sự kiện)
        options.rules.forEach((rule)=>{
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector]= [rule.test];
               
            }
            var inputElements=formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function(inputElement) {
                //Xử lí Th blur
                inputElement.onblur=function(){
                    validate(inputElement,rule);
                };
                //Xử Lý mỗi khi người dùng nhập
                inputElement.oninput=function(){
                    var errorElement=getParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector)
                    errorElement.innerText='';
                    getParent(inputElement,options.formGroupSelector).classList.remove('invalid');
                }
            })
        });
        
    }
}
//Định Nghĩa rule
//Nguyên tắc của rule
/**
 * 1. Khi có lỗi => trả message lỗi
 * 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
 */
Validator.isRequired=function(selector,message){
    return {
        selector: selector,
        test: function(value){
            return value?undefined:message||"Vui Lòng Nhập Trường Này";
        }
    };
}
Validator.isEmail=function(selector,message){
     return {
        selector: selector,
        test: function(value){
            var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value)?undefined:message||'Vui Lòng Nhập Chính Xác Email ! '
        }
    };
}
Validator.minLength = function(selector,min,message) {
    return {
        selector: selector,
        test: function(value){
            return value.length >= min?undefined:message||`Vui Lòng Nhập tối thiểu ${min} kí tự ! `
        }
    };
}
Validator.isConfirmed = function (selector,getConfirmValue,message) {
    return {
        selector: selector,
        test: function (value){
            return value === getConfirmValue()?undefined:message|| "Giá Trị Nhập Lại Không Chính Xác";
        }
    }
}