import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, doc, getDocs, Timestamp, query, orderBy, deleteDoc, updateDoc, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const card = document.querySelector('#card');
const form = document.querySelector('#form');
const todo = document.querySelector('#todo');
const logout = document.querySelector('#signout');
const profileImage = document.querySelector('#profileImage');
const username = document.querySelector('#username');

//logout function

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'index.html'
    }).catch((error) => {
        console.log(error);
    });
})


//   get data from firestore


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const q = query(collection(db, "users"), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const obj = doc.data();
            username.innerHTML = doc.data().name
            profileImage.src = doc.data().profileUrl
        });
        getdatafromfirestore(uid);
    } else {
        window.location = 'index.html';
    }
});



let arr = [];
function renderPost() {
    card.innerHTML = ''
    arr.map((item) => {
        const time = item.postDate.seconds
        const myDate = new Date(time * 1000)
        card.innerHTML += `
        <div class="card">
        <div class="card-body">
            <p class="pera" ><span><i class="fa-solid fa-circle-check"></i>${item.todo}</span></p>
            
        </div>
        <div class="card-btn">
    <button type="button" id="delete"><i class="fa-solid fa-trash-can"></i></button>
    <button type="button" id="update"><i class="fa-solid fa-pen-to-square"></i></button>
</div>

    </div>`
    })
    const del = document.querySelectorAll('#delete');
    const upd = document.querySelectorAll('#update');

    //delete function

    del.forEach((btn, index) => {
        btn.addEventListener('click', async (event) => {
            const docIdToDelete = arr[index].docId;
            await deleteDoc(doc(db, "posts", docIdToDelete))
                .then(() => {
                    console.log('post deleted');
                    arr = arr.filter((item) => item.docId !== docIdToDelete);
                    renderPost();
                })
                .catch((error) => {
                    console.error('Error deleting document: ', error);
                });
        });
    });

    //Edit function

    function updatePost(index, updateTodo) {
        arr[index].todo = updateTodo;
        renderPost();
    }

    upd.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            const updateTodo = prompt('Enter new Todo', arr[index].todo);
            if (updateTodo !== null && updateTodo !== '') {
                const docIdToUpdate = arr[index].docId;
                try {
                    await updateDoc(doc(db, "posts", docIdToUpdate), {
                        todo: updateTodo
                    });
                    arr[index].todo = updateTodo;
                    renderPost();
                } catch (error) {
                    console.error("Error updating document: ", error);
                }
            }
        });
    });





}

renderPost()

let docId;


async function getdatafromfirestore(uid) {
    const q = query(collection(db, "posts"), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    arr = [];

    querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), docId: doc.id });
    });

    renderPost();
}




//todo add data

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (todo.value === '') {
        alert('Enter your task');
    } else {
        try {
            const user = auth.currentUser;
            const postObj = {
                todo: todo.value,
                uid: user.uid,
                postDate: Timestamp.fromDate(new Date())
            };
            const docRef = await addDoc(collection(db, "posts"), postObj);
            console.log("Document written with ID: ", docRef.id);
            postObj.docId = docRef.id;
            arr = [postObj, ...arr];
            console.log(arr);
            todo.value = '';
            renderPost();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
});

