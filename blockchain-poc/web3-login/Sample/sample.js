const fs = require("fs");

// simple js code without asynchronous

// var data = fs.readFileSync('demo.txt');
// console.log(data.toString());
// console.log("Program Ended");



// js code with asynchronous using callbacks.
// function calculator(myCallback){
//     // calculation

//     setTimeout(()=>{
//         console.log("I am in calculation function..");
//     } , 3000);

//     myCallback("I am in desplay function");
// }

// function display(str){
//     console.log(str);
// }

// calculator(display);


// promises
// var myPromise = new Promise((resolve , reject)=>{
//     if(true){
//         resolve("I am resolve");
//     }
//     else
//     reject("I am reject");
// })

// myPromise.then(d => {
//     console.log(d);
// }).catch(e=>{
//     console.log(e);
// })


// async await
// async function myFunc(){
//     try {
//         var myPromise = new Promise((resolve , reject)=>{
//             setTimeout(()=>{
//                 resolve("I am in async..");
//             } , 3000);  
//         })
    
//         const data = await myPromise;
//         console.log(data);
//     } catch (error) {
//         console.log(error)
//     }
// }

// myFunc();



// let stu= ["Prince"];

// function enroleStudent(name){
//     setTimeout(()=>{
//         stu.push(name);
//         getStudent();
//     } , 3000);
// }

// function getStudent(){
//     setTimeout(()=>{
//         console.log(stu);
//     } , 1000)
// }

// enroleStudent("Nitin");
// getStudent();

// const http = require('http');

// http.createServer((request , response)=>{
//     response.end("Hello World");
// }).listen(3000);


//Event Emmiter

// let events = require('events');

// let eventEmitter = new events.EventEmitter();

// function connectionCheck(){
//     console.log('connection success');
// }
// eventEmitter.on("connection" , connectionCheck)
// eventEmitter.emit("connection");





// function func1(callback){
//     a=1;
//     if(a==1) {
//         console.log("func1");
//         callback(func3)
//     }
// }

// function func2(callback){
//     b=2;
//     if(b==2){
//         console.log("func2")
//         callback();
//     }
// }

// function func3(){
//     c=3;
//     if(c==3){
//         console.log("func3")
//     }
// }

// func1(func2);

// function func1(){
//     a=1;

//     return new Promise((resolve , reject)=>{
//             if(a==1){
//                 resolve()
//             }
//     })
// }

// function func2(callback){
//     b=2;
//     if(b==2){
//         console.log("func2")
//         callback();
//     }
// }

// function func3(){
//     c=3;
//     if(c==3){
//         console.log("func3")
//     }
// }

// func1(func2)


