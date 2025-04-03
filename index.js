let posts = [];

        
        async function fetchCatImage() {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            return data[0].url;
        }

        
        function renderFeed() {
            const feedElement = document.getElementById('feed');
            feedElement.innerHTML = '';

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                postElement.innerHTML = `
                    <div class="post-header">
                        <img src="${post.avatar}" alt="${post.username}">
                        <strong>${post.username}</strong>
                    </div>
                    <div class="post-body">${post.text}</div>
                    <img src="${post.catImage}" alt="Gatinho fofo" class="post-image">
                    <div class="post-footer">
                        <span>${post.likes} Curtidas</span>
                        <button onclick="likePost(${post.id})">Curtir</button>
                    </div>
                `;

                feedElement.appendChild(postElement);
            });
        }

        
        async function postMessage() {
            const text = document.getElementById('postText').value;

            if (text.trim() === '') return;

            
            const newPost = {
                id: posts.length,
                username: 'UsuarioExemplo',
                avatar: 'https://i.pravatar.cc/150?img=3', // Avatar genérico
                text: text,
                catImage: await fetchCatImage(),
                likes: 0,
                data: new Date()
            };

            
            posts.unshift(newPost);

            
            renderFeed();

            
            document.getElementById('postText').value = '';
        }

       
        function likePost(postId) {
            const post = posts.find(p => p.id === postId);
            if (post) {
                post.likes++;
                renderFeed();
            }
        }

        
        renderFeed();