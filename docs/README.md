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


# Getting Started
Install Validator
Clone Code from github 
``` git clone https://github.com/ngonngay/form-validator.git ```
    or [F8-Học để đi làm](https://codepen.io/ng-ngc-sn-the-bashful/pen/wvMNzKP)

Open /docs/index.html with Live Server or Reveal in File Explorer. You can see it working

For other way,
Create new form in other index.html
Your form should follow this format :
```
    <form action="" method="POST" class="form" id="form-id">
          <div class="form-group">
            <label for="fullname" class="form-label">Tên đầy đủ</label>
            <input id="fullname" name="fullname" type="text" placeholder="VD: Sơn Đặng" class="form-control">
            <span class="form-message"></span>
          </div>
          <button class="form-submit">Đăng ký</button>
    </form>
``` 

