import fs from 'fs';


// Synchronous
fs.writeFileSync("./files/test.txt", "Hello World!");

// Asynchronous
// fs.writeFile("./files/test.txt", "Hello World Async!", err => { });



// Synchronous: returns the data
const data = fs.readFileSync("./files/test.txt", "utf-8");
console.log(data);

// Asynchronous: does not return the data, it is passed to the callback function
fs.readFile("./files/test.txt", "utf-8", (err, data) => { 
    err
    ? console.error(err)
    : console.log(data);
});


fs.appendFileSync("./files/test.txt", `\n${new Date().toLocaleString()}`);

fs.copyFileSync("./files/test.txt", "./files/copy.txt");
fs.unlinkSync("./files/copy.txt"); // delete the file
console.log(fs.statSync("./files/test.txt")); // get file stats

