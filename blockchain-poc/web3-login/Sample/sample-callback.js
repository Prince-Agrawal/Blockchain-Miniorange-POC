let posts = [
    {title: "PostOne "},
    {title: "PostTwo "}
]

function getPosts(){
    let output='';

    setTimeout(()=>{
        posts.forEach((post , index)=>{
            output += post.title;

        })
        console.log(output);
    } , 1000)
    
}

function createPost(post , callback){
    setTimeout(()=>{
        posts.push(post);
        callback();
    } , 2000)
}

createPost({title: "PostThree "} , getPosts);
// getPosts();