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

//Render todo items from lowDB with checkbox toggle and remove icone
    function render(todoItems) {
        // const sortedData = todoItems.sortby(['id'])
                console.log("renderall: " +todoItems)

        const container = document.querySelector('.js-todolist');
        container.innerHTML = '';
        const todoItemsReverse = todoItems.reverse();
        // for (const todoItem of sortedData) {
        for (const todoItem of todoItemsReverse) {

            const div = document.createElement('div');
            div.innerHTML = `
            <article class="container box style1 right todoinput blogBox">
      				<img class="image fit"src="images/${todoItem.data.image}" alt="" />
      				<div class="inner">
      					<header>
      						<h2><a href="#/post/${todoItem.id}">${todoItem.data.title}</a></h2>
      					</header>
      					<p class="previewText">${todoItem.data.todo}</p>
                        <span><a href="#/post/${todoItem.id}">-Read more</a></span>
      				</div>
      			</article>
			      `;
            container.appendChild(div);
        };
    };// End of render on page load


// somehow need to use the postID as the ID to get a specific item in the Todos,
// then render just the data: todo, title, image.

    function renderOnePost(todoItem) {
        console.log("render1 " +todoItem)


        // const sortedData = todoItems.sortby(['id'])
        const mainContainer = document.querySelector('.js-to-hide');
        mainContainer.style.display = "none";


        const postContainer = document.querySelector('.js-one-post');
        postContainer.style.display = "block";

        postContainer.innerHTML = '';
        
        // const todoItemsReverse = todoItems.reverse();
        // for (const todoItem of todoItemsy) {
            const div = document.createElement('div');
        postContainer.innerHTML = `
            <a href="../index.html">Back to home</a>
                <header>
                    <img class="image fit"src="images/${todoItem.data.image}" alt="" />
                    <h2>${todoItem.data.title}</h2>
                    <p>${todoItem.data.todo}</p>
                </header>
                <section>
                    <hr />
                    <header>
                        <p></p>
                    </header>
                </section>
                  `;
            postContainer.appendChild(div);
        // };
    };// End of render on page load

    function convertMS(ms) {
      var d, h, m, s;
      s = Math.floor(ms / 1000);
      m = Math.floor(s / 60);
      s = s % 60;
      h = Math.floor(m / 60);
      m = m % 60;
      d = Math.floor(h / 24);
      h = h % 24;
      return { d: d, h: h, m: m, s: s };
    };

    // console.log(convertMS(1490011140664))

    //Flatiron Director. This creates unique pages based on postID.
      const routes = {
        '/home': () => {
            //Initializer on page load
            GET('/api/todos')
                .then((todoItems) => {
                    render(todoItems);
                });
        },
        '/post/:postId': (postId) => {
            console.log("starting postid: " +postId)
            //Initializer on page load
            GET('/api/post/'+ postId)
                .then((todoItem) => {
                    console.log("after get in Main: " +todoItem)
                    renderOnePost(todoItem);
                });
        }
    };


    const router = Router(routes);

    router.init();
    router.setRoute('/home')

})();