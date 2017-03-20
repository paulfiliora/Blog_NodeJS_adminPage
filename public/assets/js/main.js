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
        const container = document.querySelector('.js-todolist');
        container.innerHTML = '';
        const todoItemsReverse = todoItems.reverse();
        // for (const todoItem of sortedData) {
        for (const todoItem of todoItemsReverse) {
            const div = document.createElement('div');
            div.innerHTML = `
            <article class="container box style1 right todoinput">
      				<img class="image fit"src="images/${todoItem.data.image}" alt="" />
      				<div class="inner">
      					<header>
      						<h2><a href="#/post/${todoItem.id}">${todoItem.data.title}</a></h2>
      					</header>
      					<p>${todoItem.data.todo}</p>
      				</div>
      			</article>
			      `;
            container.appendChild(div);
        };
    };// End of render on page load

    //Initializer on page load
    // GET('/api/todos')
    //     .then((todoItems) => {
    //         render(todoItems);
    //     });


      // const author = function () { console.log("author"); };
      // const books = function () { console.log("books"); };
      // const viewBook = function (bookId) {
      //   console.log("viewBook: bookId is populated: " + bookId);
      // };

      const routes = {
        '/home': () => {
            //Initializer on page load
            GET('/api/todos')
                .then((todoItems) => {
                    render(todoItems);
                });
        },
        '/post/:postId': (postId) => {
            //Initializer on page load
            GET('/api/todos/'+ postId)
                .then((todoItems) => {
                    console.log(todoItems)
                    renderOnePost(todoItems);
                });
        }
    };
// somehow need to use the postID as the ID to get a specific item in the Todos,
// then render just the data: todo, title, image.

    function renderOnePost(todoItems) {
        // const sortedData = todoItems.sortby(['id'])
        const mainContainer = document.querySelector('.js-to-hide');
        mainContainer.style.display = "none";


        const postContainer = document.querySelector('.js-one-post');
        postContainer.style.display = "block";

        postContainer.innerHTML = '';
        // const todoItemsReverse = todoItems.reverse();
        // for (const todoItem of sortedData) {
        for (const todoItem of todoItems) {
            // const div = document.createElement('div');
            postContainer.innerHTML = `
            <a href="../index.html">Back to home</a>

                <header>
                    <h2>${todoItem.data.title}</h2>
                    <p>${todoItem.data.todo}</p>
                </header>
                <section>
                    <hr />
                    <header>
                        <p>${todoItem.data.when}</p>
                    </header>
                </section>
                  `;
            // container.appendChild(div);
        };
    };// End of render on page load




    const router = Router(routes);

    router.init();
    router.setRoute('/home')

})();