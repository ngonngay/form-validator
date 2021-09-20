# This is small library for form validation.
> Created by developer network of F8 community
## Supported: 
- input[type='text']
- input[type='password']
- input[type='file']
- input[type='radio']
- input[type='checkbox']
- input[type='email']
- select


#### Source 
Source code from origin developer [F8-Học để đi làm](https://codepen.io/ng-ngc-sn-the-bashful/pen/wvMNzKP)

# Table of contents
- [Getting started](#getting-started)
- [Arguments](#arguments)
    - [form](#form)
    - [formGroupSelector](#formgroupselector)
    - [errorSelector](#errorselector)
    - [rules](#rules)
    - [onSubmit](#onsubmit)
- [Method](#rules-method)
    - [isRequired](#isrequired)
    - [isEmail](#isemail)
    - [minLength](#minlength)
    - [hasSpecialCharacter](#hasspecialcharacter)
    - [hasNumber](#hasnumber)
    - [hasNumberOnly](#hasnumberonly)
    - [hasUpperCase](#hasuppercase)
    - [hasLowerCaseOnly](#haslowercasecnly)
    - [isConfirmed](#isconfirmed)
# Getting Started
Install Validator
Clone Code from github 
``` git clone https://github.com/ngonngay/form-validator.git ```
    or [F8-Học để đi làm](https://codepen.io/ng-ngc-sn-the-bashful/pen/wvMNzKP)

Open /docs/index.html with Live Server or Reveal in File Explorer. You can see it working

For other way,
Create new form in other index.html.
Your form should follow this format :
```<form action="" method="POST" class="form" id="form-id">
        <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input id="email" name="email" type="text" placeholder="VD: email@domain.com" class="form-control">
            <span class="form-message"></span>
        </div>
        <div class="form-group">
            <label for="password" class="form-label">Mật khẩu</label>
            <input id="password" type="password" name="password"  placeholder="Nhập mật khẩu" class="form-control">
            <span class="form-message"></span>
        </div>
        <button class="form-submit">Đăng ký</button>
    </form>
``` 
- Your form must have separate form-groups for each data field
- For unique data fields (eg full-name, email, password,...), input tags should have 'id' attributes for easy search in the DOM
- For data groups (eg radio button , checkbox) the tags should have the same 'name' attribute and be placed in a form-group.
```
    <div class="form-group">
        <div>
        <input name="gender" value="male" type="radio"   class="form-control">
        Male
        </div>
        <div>
        <input name="gender" value="female" type="radio"   class="form-control">
        Female
        </div>
        <div>
        <input name="gender" value="other" type="radio"   class="form-control">
        Other
        </div>
        <span class="form-message"></span>
    </div>
```
- For error messages, the program appends the error message in the element passed as an argument by the constructor.
- Link js file to your index.html and call library
``` <script src="./validator.js"></script>
      <script >
          Validator({
            form: '#form-1',
            formGroupSelector: '.form-group',
            errorSelector:'.form-message',
            rules: [
                Validator.isRequired('#fullname'),
                Validator.isRequired('#email'),
                Validator.isRequired('input[name="gender"]'),
                Validator.isEmail('#email'),
                Validator.minLength('#password',6),
                Validator.isConfirmed('#password_confirmation',function(){
                     return document.querySelector('#password_confirmation').value;
                },"Mật Khẩu Nhập Lại không chính xác")
            ],
            onSubmit: function(data) {
              console.log(data);//console.log thì bị bỏ qua
            }
          });
    </script> 
```
Done.
# Arguments
-   Validator is called through constructor
``` Validator(); ```
- We will pass arguments to run the program, here are the arguments:

| Parameter                  | Meaning                                        |
| -------------------------- | ---------------------------------------------- |
| **form** (*)               | Pass 'id' attribute of form                    |
| **formGroupSelector** (*)  | 'class' attribute of form-group                |
| **errorSelector** (*)      | 'class' of element will display error message  |
| **rules** (*)              | Validate rule for data field                   |
| **onSubmit**               | Callback function                              |
  
  **(*) is required**
#### form
We have form here : 
```                     
   => <form action="" method="POST" class="form" id="form-id"> 
    </form>                                             
```
in ```Validator()``` just pass ```#form-id``` to it, like :
```
Validator({
   => form :"#form-id"
})
```
**Dont forget * # * (for id) and * . * (for class name ) when pass argument**\
**Dont forget this *{ }* when pass argument !**
#### formGroupSelector
This parameter specifies which element the form-group is\
```
 =>   <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input id="email" name="email" type="text" placeholder="VD: email@domain.com" class="form-control">
        <span class="form-message"></span>
    </div>
```
When pass Like:
```
Validator({
    form :"#form-id",
  =>  formGroupSelector: 'form-group',
})
```
#### errorSelector
This parameter specifies which element display error message is\
```
    <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input id="email" name="email" type="text" placeholder="VD: email@domain.com" class="form-control">
       => <span class="form-message"></span>
    </div>
```
When pass Like:
```
Validator({
    form :"#form-id",
    formGroupSelector: 'form-group',
  =>  errorSelector:'.form-message',
})
```
#### rules
This parameter specifies the rules to be applied to validate the data field\
A data field can have many rules, for example 'email' has rules like required, isEmail,....
```
 Validator({
            form: '#form-1',
            formGroupSelector: '.form-group',
            errorSelector:'.form-message',
           => rules: [
                 Validator.isRequired('#fullname'),
                Validator.hasUpperCase('#password',true),
            ],
          });
```
Predefined rules:

| Rule               | Meaning                                        |
| -------------------------- | ---------------------------------------------- |
| [isRequired](#isrequired)               | required a filed not empty                    |
| [isEmail](#isemail)  | validate email format              |
| [minLength](#minlength)      | min length of the target  |
| [maxLength](#maxlength)      | max length of the target  |
| [hasSpecialCharacter](#hasspecialcharacter)              | has special characters                   |
| [hasNumber](#hasnumber)               | has number                               |
| [hasNumberOnly](#hasnumberonly)               | has number                               |
| [hasUpperCase](#hasuppercase)          | has uppercase   or only upper case                     |
| [hasLowerCaseOnly](#haslowercasecnly)             | has lowercase only                         |
| [isConfirmed](#isconfirmed)               | compare 2 values                            |


#### onSubmit
Is an optional callback function\
This callback will be called when the user clicks on the register button to submit the form\
When the form is submitted, all the rules will be validated\
If you pass a callback to onSubmit, the validator will stop the submit event and return the entered data object\
Otherwise, the form will be submitted according to the method and action declared on the form
```
 Validator({
            form: '#form-1',
            formGroupSelector: '.form-group',
            errorSelector:'.form-message',
            rules: [
                 Validator.isRequired('#fullname'),
                Validator.hasUpperCase('#password',true),
            ],
        =>  onSubmit: function(data) {
            //you can call api here
            // data is the data entered into the fields. field name will be the name of the input tag
              console.log(data);
            }
          });
```
# Rules Methods
 Predefined rules:
## isRequired Methods
### Definition
- Require users not to leave this field blank
### Validator.isRequired = function (selector, message) {}
#### Parameter
   **selector** : string
    > css selector of the field to check
   **message** : string
    > error message will be appended to the error element
## isEmail  Methods
### Definition
- Check if the email the user entered is in email format or not
### Validator.isEmail = function (selector, message) {}
#### Parameter
   **selector** : string
> css selector of the field to check
   **message** : string
> error message will be appended to the error element
## minLength Methods
### Definition
- Check minimum length of string
### Validator.minLength = function (selector, min, message) {}
#### Parameter
 **selector** : string
> css selector of the field to check
**min**: number
> minimum length of string
**message** : string
> error message will be appended to the error element
## maxLength Methods
### Definition
- Check maximum length of string
### Validator.minLength = function (selector, max, message) {}
#### Parameter
**selector** : string
> css selector of the field to check
**max**: number
> maximum length of string
**message** : string
> error message will be appended to the error element
## hasSpecialCharacter Methods
### Definition
-   Check string has special characters or not
### Validator.hasSpecialCharacters = function(selector,message) {}
#### Parameter
**selector** : string
> css selector of the field to check
**message** : string
> error message will be appended to the error element
## hasNumber Methods
### Definition
- Check if string has numeric characters or not
### Validator.hasNumber = function(selector,message) {}
#### Parameter
 **selector** : string
> css selector of the field to check
 **message** : string
> error message will be appended to the error element
## hasNumberOnly Methods
### Definition
- Check if string is numeric or not
### Validator.hasNumberOnly = function(selector,allowDecimal=false,message) {}
#### Parameter
**selector** : string
> css selector of the field to check
**allowDecimal** : boolean
> Allowed decimal places. Default value is false.
**message** : string
> error message will be appended to the error element
## hasUpperCase Methods
### Definition
- Check for uppercase characters
### Validator.hasUpperCase = function(selector,only=false,message) {}
#### Parameter
**selector** : string
> css selector of the field to check
**only** : boolean
> Mark string with only uppercase characters
**message** : string
> error message will be appended to the error element
## hasLowerCaseOnly Methods
### Definition
> Check string with only lowercase characters
### Validator.hasLowerCaseOnly = function(selector,message) {}
#### Parameter
**selector** : string
> css selector of the field to check
**message** : string
> error message will be appended to the error element
## isConfirmed Methods
### Definition
Compare the string with the value returned from a callback function
### Validator.isConfirmed = function (selector, getConfirmValue, message) {}
#### Parameter
**selector** : string
> css selector of the field to check
**getConfirmValue** : function
> callback function that will return the value in order to compare with selector value
**message** : string
> error message will be appended to the error element
