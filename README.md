# iss-tracker-cli
A simple International Space Station tracker CLI.
<br/>
<br/>
Can current only be requested by 2 command line HTTP clients: **`curl`** and **`HTTPie`**. If any other clients attempt to access the endpoint, it'll respond with the **`404`** HTTP error (Not Found).
<br/>
<br/>
**The endpoint can be accessed via `iss.cryptid.dev`** 

## Example
![example1](/examples/examplegif.gif)

## How to use

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
<br/>

#### Without color

If you want a boring monotone version of the table, you can use the `mono` query:
```sh
# Its pretty much the same method for bot cURL and HTTPie:
$ http "iss.cryptid.dev?mono"
``` 

#### Units
Units for some information (where required) can be:
 * [`km (kilometers)`](https://en.wikipedia.org/wiki/Kilometre "In case you dont know :)")
 * [`miles`](https://en.wikipedia.org/wiki/Mile "In case you dont know :)")

You can pass through your desired unit type via the `units` query:
```sh
# Using HTTPie:
$ http iss.cryptid.dev units==miles
```
