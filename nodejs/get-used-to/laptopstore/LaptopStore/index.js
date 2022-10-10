const fs = require('fs'); //module name : fs. now ready to load file.
const http = require('http'); //module name : http
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8"); //why sets it sync? - no problem b/c it only happens once you starts an app. not while millions of users might be using the app at the same time. http.createServer(callback func) is where you dont want to block main thread
// console.log(__dirname); //returns absolute path
// console.log(json);

const laptopData = JSON.parse(json);
// console.log(laptopData);

// Create  a server
const server = http.createServer((req, res) => { //request, response as arguments
    // console.log('Someone did access the server!');
    
    // console.log(req.url); //localhost/products 라고 치면, /products라고 나옴
    const pathName = url.parse(req.url, true).pathname;

    // if type 127.0.0.1:1337/laptop?id=4  it says [Object: null prototype] { id: '4' } 
    // if type 127.0.0.1:1337/laptop?id=4&name=apple&date=today  it says [Object: null prototype] { id: '4', name: 'apple', date: 'today }
    const id = url.parse(req.url, true).query.id; //not going to use other query selectors other than id, so specify id using .id
    
    // PRODUCT OVERVIEW
    if(pathName === '/products' || pathName === '/'){
        res.writeHead(200, {'Content-type':'text/html'});
        
        //1. get {%CARDS%}
        //2. replace {%CARDS%} with template-card.html
        fs.readFile(`${__dirname}/templates/template-overview.html`,'utf-8', (err, data) => {
            let overviewOutput = data;
            fs.readFile(`${__dirname}/templates/template-card.html`,'utf-8', (err, data) => {
                
                const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join(''); //.join('') makes it into a string
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);
                
                //ERROR - images does not load
                //b/c on node.js, there is no such concept as file or folder
                //we have to use an request to load an image, instead of doing ./data/img/images.jpg

                res.end(overviewOutput); 
            }); 
        });

        
    }

    // LAPTOP DETAIL
    else if(pathName === '/laptop' && id < laptopData.length){
        res.writeHead(200, {'Content-type':'text/html'});
 
        // res.end(`This is the LAPTOP page for laptop ${id}!`);
 
        fs.readFile(`${__dirname}/templates/template-laptop.html`,'utf-8', (err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop)
            res.end(output);
        }); 
        
        //this time, not using sync ver. in node.js, we have async, sync of the same function.
        //sync is always blocking the entire thread. it makes the entire code stop for the time that the function is doing its work
        //b/c node.js runs on only one thread, no matter you got 10 users, or a million users accessing your app at the same time.
        //so if use sync, it takes up all the time and all other a million - 1 users have to wait until that function finishes the work
        //so we want this async so that it works on the background and as soon as they finish, they simply run the callback func
    }

    // IMAGES
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)){ //reg
        // Results of console.log(pathName); : not only /products, but also /$laptopNames.jpg
        // Listening for requests now
        // /products
        // /css/style.css
        // /$huawei-matebook-pro.jpg
        // /$macbook-pro-15.jpg
        // /$dell-xps-13.png
        // /$asus-zenbook-flip-s.jpg
        // /$samsung-notebook-9.jpg

        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            res.writeHead(200, {'Content-type':'image/jpg'});
            res.end(data);
        }); //in real world app, we need to do error-handling using err arg
    }

    //URL NOT FOUND
    else {
        res.writeHead(404, {'Content-type':'text/html'});
        res.end('URL was not found on the server!');
    } 
    


    //set an http header : small message that we send with a request to let the browser know what kind of data is coming in
    res.writeHead(200, {'Content-type' : 'text/html'} ); //200 for 'everything works fine', and the content type. 404 for 'error'
    // res.end('This is the response!'); // 만약 앞에 res.end(output); 있는데 이거 또쓰면 덮어써서 This is the response!밖에 안나옴

    //there is currently no routing. if we type 127.0.0.1:1337/askdjfklj,
    //it will sends us back to 127.0.0.1:1337
    //because there is no routing set up yet
    //but we want different response for different urls 
    //like 127.0.0.1:1337/product


});//each time someone opens up the page, this callback func fires

// listen on a specific port and a specific IP address
// look for incoming requests at port 1337, of stated ip address
server.listen(1337, '127.0.0.1', () => { //it tells node.js to always keep listening on a certain port, on a certain ip address. 127.0.0.1 === local address
    console.log('Listening for requests now');
}); 

//now, if you go type 127.0.0.1:1337, it keeps loading but X do anything. but terminal says 'listening for requests now' and 'someone did access the server!'
//so we know we are on the server.
//this keeps loading b/c we are not sending back any results from the server to the browser right now


function replaceTemplate(originalHtml, laptop){
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image); //reg b/c images appears twice and we dont want to use two .replace()
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.description);
    return output;
};