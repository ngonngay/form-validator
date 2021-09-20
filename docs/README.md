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
- For error messages, the program appends the error message in the element passed as an argument by the constructor
Link js file to your index.html and call library
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
  

#### form
We have form here : 
```
    <form action="" method="POST" class="form" id="form-id">
         
    </form>
```
in ```Validator()``` just pass ```#form-id``` to it, like :
```
Validator({
    form :"#form-id"
})
```
**Dont forget * # * (for id) and * . * (for class name ) when pass argument**
**Dont forget this *{ }* when pass argument !**