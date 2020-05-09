# iss-tracker-cli
A simple International Space Station tracker CLI.
<br/>
<br/>
**The endpoint can be accessed at `iss.cryptid.dev`**

## Example
![example1](/examples/examplegif.gif)

## How to use

### cURL
```sh
# Using cURL:
$ curl iss.cryptid.dev
```

### HTTPie
```sh
# Using HTTPie:
$ http -b iss.cryptid.dev
```
<br/>

#### Without color

If you want a boring monotone version of the table, you can use the `mono` query:
```sh
# Its pretty much the same method for both cURL and HTTPie:
$ http "iss.cryptid.dev?mono"
``` 

#### Units
Units for some information (where required) can be:
 * [`km (kilometers)`](https://en.wikipedia.org/wiki/Kilometre "In case you dont know :)")
 * [`mi (miles)`](https://en.wikipedia.org/wiki/Mile "In case you dont know :)")

<br/>Note: You could also pass in the lengthy versions of the units.

You can pass through your desired unit type via the `units` query:
```sh
# Using HTTPie:
$ http -b iss.cryptid.dev units==mi
```

## Notes
* The Endpoint can only be accessed by 2 command line HTTP clients: **`curl`** and **`HTTPie`**. If any other clients attempt to access the endpoint, it'll respond with the **`404`** HTTP error (Not Found).
* Due to the table being unicode, Windows' Command Prompt won't exactly display it nicely. Use something like 
[`git's Bash`](https://gitforwindows.org/), or you could get unicode to work on Command Prompt.
