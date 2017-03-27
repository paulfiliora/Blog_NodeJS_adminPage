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

})();