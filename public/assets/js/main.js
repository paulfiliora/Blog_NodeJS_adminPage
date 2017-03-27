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

})();