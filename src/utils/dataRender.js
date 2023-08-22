import { getAllKeysIndexedDB } from '../indexedDB/indexedDB.js';

export function dataRender(dataList) {
    for (let i = 0; i < dataList.length; i++) {
      const postListEl = document.createElement('img');
      const mainPostsEl = document.querySelector('.main__posts');
      const databaseName = 'instagram';
      const version = 1;
      const objectStore = 'posts';
  
      getAllKeysIndexedDB(databaseName, version, objectStore, function (keys) {
        const postId = keys[i]; // posts ObjectStore에 있는 Key를 id로 사용해보세요.
        mainPostsEl.setAttribute('class', 'main__posts');
        postListEl.setAttribute('src', dataList[i].image);
        postListEl.setAttribute('id', postId);
        postListEl.setAttribute('alt', 'user_post_image');
        postListEl.addEventListener('click', function () {
          window.location.pathname = `/post/${postId}`;
        });
  
        document.querySelector('.main__posts').appendChild(postListEl);
      });
    }
  }
  