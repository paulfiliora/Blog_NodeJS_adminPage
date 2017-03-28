(function() { // protect the lemmings

    function GET(url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };
            request.send();
        });
    } // GET

    function POST(url, data) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', url);
            request.setRequestHeader('Content-Type', 'application/json');

            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };

            request.send(JSON.stringify(data));
        });
    } // POST

    function PUT(url, data) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('PUT', url);
            request.setRequestHeader('Content-Type', 'application/json');

            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };

            request.send(JSON.stringify(data));
        });
    } // PUT

    function DELETE(url, data = {}) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('DELETE', url);
            request.setRequestHeader('Content-Type', 'application/json');

            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };

            request.send(JSON.stringify(data));
        });
    } // DELETE

function initCreatorPage() {
    const popup = document.querySelector('.notify');
        //Add ToDo function, User & Server Side processing
        const addToDo = () => {
            const titleInput = document.querySelector('.js-title-text');
            const mainInput = document.querySelector('.js-todo-text');
            const imageInput = document.querySelector('.js-image-name');
            mainInput.setAttribute('disabled', 'disabled');
            POST('/api/posts', {
                title: titleInput.value,
                post: mainInput.value,
                image: imageInput.value,
                when: new Date().getTime() + 9 * 60 * 60 * 1000
            }).then((data) => {
                titleInput.removeAttribute('disabled');
                mainInput.removeAttribute('disabled');
                titleInput.value = '';
                mainInput.value = '';
                popup.click()
            });
        }

        //Event listener for adding a new ToDo item
        document.querySelector('.js-add-todo').addEventListener('click', (e) => {
          e.preventDefault();
          addToDo()
        });

        document.querySelector('.js-todo-text').addEventListener('keydown', (e) => {
            const {
                keyCode,
                which
            } = e;
            if (keyCode === 13 || which === 13) {
                addToDo();
            }
        });
}

function initManagerPage() {
//Render blog posts from lowDB with edit toggle and remove icons
    function renderFeed(posts) {
        // const sortedData = posts.sortby(['id'])
        const container = document.querySelector('.js-postlist');
        container.innerHTML = '';
        // for (const post of sortedData) {
        for (const post of posts) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>
                <label class="checkbox">
                    <input type="checkbox" value="" data-toggle="checkbox">
                </label>
            </td>
            <td>Date: ${post.data.when}</td>
            <td><b>${post.data.title}</b></td>
            `;
            tr.innerHTML += `<td><button type="button" rel="tooltip" title="Edit Task" class="btn btn-info btn-simple btn-xs js-post-edit">
                    <i class="fa fa-edit"></i>
                </button></td>`
            tr.innerHTML += `<td><button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs js-post-remove">
                    <i class="fa fa-times"></i>
                </button></td>
            `;
            container.appendChild(tr);

            tr.querySelector('.js-post-remove').addEventListener('click', (e) => {
                const { id } = post;
                DELETE('/api/post/' + id)
                    .then((data) => {
                        renderFeed(data);
                    })
                    .catch((e) => {
                        alert(e)
                    });
            });

            tr.querySelector('.js-post-edit').addEventListener('click', (e) => {
              const editBox = document.querySelector('.js-edit-box')
              editBox.innerHTML = ""
              editBox.innerHTML += `
              <div class="input-group">
              <input type="text" class="form-control js-update-title" placeholder="Username" aria-describedby="basic-addon1" value="${post.data.title}">
              <input type="text" class="form-control js-update-text" placeholder="Username" aria-describedby="basic-addon1" value="${post.data.post}">
              </div>
              <div class="btn-group btn-group-justified" role="group" aria-label="...">
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-default js-update-put">Update</button>
                </div>
              </div>
              `;
                editBox.querySelector('.js-update-put').addEventListener('click', (e) => {
                   updatePost();
                })

            });
            
            //Update
            const updatePost = () => {
                const updateTitle = document.querySelector('.js-update-title');
                // const { id } = post;
                const mainInput = document.querySelector('.js-update-text');
                mainInput.setAttribute('disabled', 'disabled');

                PUT('/api/post/' + post.id, {
                  title: updateTitle.value,
                  post: mainInput.value
                })
                .then((data) => {
                    updateTitle.removeAttribute('disabled');
                    mainInput.removeAttribute('disabled');
                    updateTitle.value = '';
                    mainInput.value = '';
                    renderFeed(data);
                }).catch((e) => {
                    alert(e)
                })
            }
        };
    };// End of render on page load

    //Initializer on page load
    GET('/api/posts')
        .then((posts) => {
            renderFeed(posts);
        });
}

function initHome() {

//Render post items from lowDB with checkbox toggle and remove icone
    function render(posts) {

        const container = document.querySelector('.js-blogPosts');
        container.innerHTML = '';
        const postsReverse = posts.reverse();
        for (const post of postsReverse) {

            const div = document.createElement('div');
            div.innerHTML = `
            <article class="container box style1 right postinput blogBox">
                    <img class="image fit"src="images/${post.data.image}" alt="" />
                    <div class="inner">
                        <header>
                            <h2><a href="#/post/${post.id}">${post.data.title}</a></h2>
                        </header>
                        <p class="previewText">${post.data.post}</p>
                        <span><a href="#/post/${post.id}">-Read more</a></span>
                    </div>
                </article>
                  `;
            container.appendChild(div);
        };
    };// End of render on page load


// Render single post based on URL :ID
    function renderOnePost(post) {

        const mainContainer = document.querySelector('.js-to-hide');
        mainContainer.style.display = "none";


        const postContainer = document.querySelector('.js-one-post');
        postContainer.style.display = "block";

        postContainer.innerHTML = '';
        
            const div = document.createElement('div');
        postContainer.innerHTML = `
            <a href="../index.html">Back to home</a>
                <header>
                    <img class="image fit"src="images/${post.data.image}" alt="" />
                    <h2>${post.data.title}</h2>
                    <p>${post.data.post}</p>
                </header>
                <section>
                    <hr />
                    <header>
                        <p></p>
                    </header>
                </section>
                <div id="disqus_thread"></div>

                  `;
            postContainer.appendChild(div);
        // };
    };// End of render on page load

//Flatiron Director. This creates unique pages based on postID.
      const routes = {
        '/home': () => {
            //Initializer on page load
            GET('/api/posts')
                .then((posts) => {
                    render(posts);
                });
        },
        '/post/:postId': (postId) => {
            console.log("starting postid: " +postId)
            //Initializer on page load
            GET('/api/post/'+ postId)
                .then((post) => {
                    renderOnePost(post);
                });
        }
    };

    const router = Router(routes);

    router.init();
    router.setRoute('/home')
}

if (document.querySelector('.js-html-Home') !== null){
    initHome();
}

if (document.querySelector('.js-html-postCreator') !== null){
    initCreatorPage();
}

if (document.querySelector('.js-html-postManager') !== null){
    initManagerPage();
}

})();