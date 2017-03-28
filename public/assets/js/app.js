(function() {

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

    const submitSignUpBtn = document.querySelector('.js-signup');
    if (submitSignUpBtn !== null) {
        submitSignUpBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const name = document.querySelector('.js-name').value;
            const email = document.querySelector('.js-email').value;
            const password = document.querySelector('.js-pw').value;

            POST('/auth/signup', {
                name,
                email,
                password,
            }).then((data) => {
                console.log(data)
                if (data.success) {
                    window.location.href = '/login.html'
                }
            });
        });
    }

    
})();
