const viewBtn = document.getElementById('btnViewPost');

function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);

    viewBtn.addEventListener('click', displayPost);
    viewBtn.disabled = true;
}

attachEvents();

//first getting the posts
async function getPosts(){
    const url = 'http://localhost:3030/jsonstore/blog/posts';

    const response = await fetch(url);
    const data = await response.json();

    const select = document.getElementById('posts');
    select.innerHTML = '';

    Object.values(data).map(createOption).forEach(option => select.appendChild(option));

    viewBtn.disabled = false;
}

//create an <option> in the DOM
function createOption(post){
    const result = document.createElement('option');
    result.textContent = post.title;
    result.value = post.id;
    return result;
}

//doing the following
function displayPost(){
    //find the selected option and it's id
    const postId = document.getElementById('posts').value;
    getCommentsByPostId(postId);
}

//second getting the comments
async function getCommentsByPostId(id){

    const commentsUl = document.getElementById('post-comments');
    commentsUl.innerHTML = '';

    const postUrl = 'http://localhost:3030/jsonstore/blog/posts/'+ id;
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    const [postResponse, commentsResponse] = await Promise.all([
        fetch(postUrl),
        fetch(commentsUrl)
    ]);

    const postData = await postResponse.json();

    document.getElementById('post-title').textContent = postData.title;
    document.getElementById('post-body').textContent = postData.body;

    const commentsData = await commentsResponse.json();

    const comments = Object.values(commentsData).filter(comm => comm.postId == id);

    comments.map(createComment).forEach(com => commentsUl.appendChild(com));

}
//create li-element in DOM
function createComment(comment){
    const result = document.createElement('li');
    result.textContent = comment.text;
    result.id = comment.id;
    return result;
}