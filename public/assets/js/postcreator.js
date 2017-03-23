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

    // function convertMS(ms) {
    //   var d, h, m, s;
    //   s = Math.floor(ms / 1000);
    //   m = Math.floor(s / 60);
    //   s = s % 60;
    //   h = Math.floor(m / 60);
    //   m = m % 60;
    //   d = Math.floor(h / 24);
    //   h = h % 24;
    //   return { d: d, h: h, m: m, s: s };
    // };

const popup = document.querySelector('.notify');
    //Add ToDo function, User & Server Side processing
    const addToDo = () => {
        // console.log("adding post")
        const titleInput = document.querySelector('.js-title-text');
        const mainInput = document.querySelector('.js-todo-text');
        const imageInput = document.querySelector('.js-image-name');
        mainInput.setAttribute('disabled', 'disabled');
        POST('/api/todos', {
            title: titleInput.value,
            todo: mainInput.value,
            image: imageInput.value,
            when: new Date().getTime() + 9 * 60 * 60 * 1000
            // const time = convertMS(when)
        }).then((data) => {
            titleInput.removeAttribute('disabled');
            mainInput.removeAttribute('disabled');
            titleInput.value = '';
            mainInput.value = '';
            popup.click()
            // render(data);
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

})();