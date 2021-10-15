function Validator(formSelector,options={}){
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    var formRules={};
    var validatorRules={
        required: function(value){
            return value?undefined:'Vui Lòng Nhập Trường Này'
        },
        email : function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :'Trường này phải là email';
        },
        min: function(min){
            return function(value){
                return value.length >=min? undefined: `Tối thiểu ${min} kí tự`
            }
        },
        max: function(max){
            return function(value){
                return value.length >=max? undefined: `Tối thiểu ${min} kí tự`
            }
        }
    };

    var formElement = document.querySelector(formSelector);
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');
        //console.log(inputs);
        for(var input of inputs){
            var rules=input.getAttribute('rules').split('|');
            //console.log(input.name,rules);
            for (var rule of rules) {
                var ruleInfo;
                var isRuleHasValue=rule.includes(':');
                if (isRuleHasValue) {
                    ruleInfo=rule.split(':');
                    rule=ruleInfo[0];
                }
                var ruleFunc = validatorRules[rule];
                if (isRuleHasValue) {
                    ruleFunc=ruleFunc(ruleInfo[1]);
                }
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc);
                }else{
                    //console.log('validatorRule: '+[validatorRules[rule]]);
                    formRules[input.name]=[ruleFunc];
                    //console.log(formRules[input.name]);
                }
            }
            //lắng nghe
            input.onblur=handleValidate;
            input.oninput=handleClearError;
        }
        function handleValidate(event) {
            var rules= formRules[event.target.name];
            var errorMessage;
            rules.some(function(rule) {
                errorMessage=rule(event.target.value);
                return errorMessage;
            })
            if(errorMessage){
               var formGroup= getParent(event.target,'.form-group');
               
               if (formGroup) {
                    var formMessage= formGroup.querySelector('.form-message');
                    if (formMessage) {
                        formGroup.classList.add('invalid');
                        formMessage.innerText=errorMessage;
                    }
                   
               }
            }
            //console.log("errorMessage :" +!!errorMessage)
            return !!errorMessage;
        }
        function handleClearError(event){
            var formGroup= getParent(event.target,'.form-group');
            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');
                var formMessage= formGroup.querySelector('.form-message');
                if (formMessage) {
                    formMessage.innerText='';
                }
            }
        }
       
        //console.log(formRules);
    }
    formElement.onsubmit=function(e){
        e.preventDefault();
        var inputs = formElement.querySelectorAll('[name][rules]');
        var isValid=true;
        //console.log(inputs);
        for(var input of inputs){
            if (handleValidate({target:input})) {
                isValid=false;
            }
        }
        //console.log(isValid);
        if (isValid) {
            
            if (typeof options.onSubmit ==='function') {
                var enableInputs = formElement.querySelectorAll('[name]');
                var formValues = Array.from(enableInputs).reduce(function (values, input) {
                    
                    switch(input.type) {
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked')?.value;
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
                formElement.submit();
            }
        }
    }
}