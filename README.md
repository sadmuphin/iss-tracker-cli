# iss-tracker-cli
A simple International Space Station tracker CLI.
<br/>
<br/>
Can only be used by 2 command line HTTP clients: **`curl`** and **`HTTPie`**. If any other clients attempt to access the endpoint, it'll respond with the **`404`** HTTP error (Not Found).
<br/>
<br/>
**The endpoint can be accessed via `iss.cryptid.dev`** 

## Examples 
![example1](/examples/example1.png)

### cURL
```sh
# Using curl:
$ curl iss.cryptid.dev
```


### HTTPie
```sh
# Using httpie:
$ http iss.cryptid.dev
```
