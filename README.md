# form-validator
handle form validation
# Regex email : 
### Kiểm tra xem có phải là email hay không  nguồn stackoverflow // validate email regular expression
```
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 return re.test(String(value).toLowerCase()) ? undefined : 'Vui lòng nhập email';
```
### Fix lỗi k load được .ico // fix cannot load ico issue
```
 <link rel="shortcut icon" href="#">
```
> add this link to head tag