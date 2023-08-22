import { createIndexedDB, getAllIndexedDB, getIndexedDB } from "./src/indexedDB/indexedDB.js";
import { createModal } from "./src/utils/createModal.js";
import { dataRender } from "./src/utils/dataRender.js";
import { postView } from "./src/template/postView.js";

function main() {
  const databaseName = "instagram";
  const version = 1;
  const objectStore = "posts";

  const pathArray = window.location.pathname.split("/");
  const postId = pathArray[2];
  if (pathArray[1] === "post") {
    getIndexedDB(databaseName, version, objectStore, pathArray[2], function (data) {
        document.body.innerHTML = postView(data.image, data.content);
        const closeBtn = document.querySelector(".post__view > img");
        
        const updateBtn = document.querySelector(".post__buttons > button:first-child");
        
        closeBtn.addEventListener("click", function () {
          window.location.pathname = "";
        });
        
        updateBtn.addEventListener("click", function() {
            const result = window.prompt("수정할 내용을 작성해주세요.", "");
            if(result) {
                updateIndexedDB(databaseName, version, objectStore, postId, result, function() {
                    window.location.reload();
                });
            }
        });
      });
    return;
  }

  document.querySelector("#add-post").addEventListener("click", createModal);

  createIndexedDB(databaseName, version, objectStore, function () {
    getAllIndexedDB(databaseName, version, objectStore, function (dataList) {
      const mainPostsEl = document.querySelector(".main__posts");
      if (dataList.length !== 0) {
        mainPostsEl.innerHTML = "";
        dataRender(dataList);
      } else {
        mainPostsEl.setAttribute("class", "main__posts not-posts");
      }
    });
  });
}

main();
