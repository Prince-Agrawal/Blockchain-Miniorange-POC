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

function createPost(post){

    return new Promise((resolve , reject)=>{
        setTimeout(()=>{
            posts.push(post);

            let error = false;

            if(!error) resolve();

            reject({errMessage: "Something Went Wrong.."})
        } , 2000);
    })
}

createPost({title: "PostThree "}).then(getPosts).catch(e => {
    console.log(e);
})

// getPosts();