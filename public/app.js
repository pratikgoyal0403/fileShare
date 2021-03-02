const dropContainer = document.querySelector(".drop");
const input = document.querySelector(".input");
const filePreview = document.querySelector(".preview");
const shareLinkContainer = document.querySelector(".share-link");
const LinkContainer = document.querySelector(".link-container");
const alert = document.querySelector('.alert');

dropContainer.addEventListener("dragleave", (e) => {
  e.stopPropagation();
});
dropContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
});
//LISTENING TO DROP EVENT
dropContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  //STORING FILE
  const file = e.dataTransfer.files;
  //HANDLING FILE
  handleFile(file[0]);
});
//listening to click event opening file opener
dropContainer.addEventListener("click", () => {
  showOpenFilePicker({ multiple: false })
    .then((result) => result[0].getFile())
    .then((result) => handleFile(result))
    .catch((err) => console.log(err));
});
//HANDLE FILE FUNCION
const handleFile = (file) => {
  console.log(input, file);
  //   input.files = file;
  document.querySelector(".drop > p").style.display = "none";
  document.querySelector(".before-img").style.display = "none";
  if (
    file.type === "image/jpeg" ||
    file.type === "image/jpg" ||
    file.type === "image/png"
  ) {
    renderImgPreview(file);
  } else {
    renderFilePreview(file);
  }
  uploadFile(file);
};
//UPDATING DOM IS FILE IS NOT OF IMAGE TYPE
const renderFilePreview = (file) => {
  filePreview.innerHTML = `<div class="filename">${file.name}</div>`;
  filePreview.classList.add("plain");
  filePreview.style.display = "block";
};
//UPDATING DOM IF FILE IS OF IMAGE TYPE
const renderImgPreview = (file) => {
  if (filePreview.classList.contains("plain"))
    filePreview.classList.remove("plain");
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onloadend = () => {
    filePreview.innerHTML = `<img src="${fileReader.result}" />
            <div class="filename">${file.name}</div>`;

    filePreview.style.display = "block";
  };
};

//show Alert
const showAlert = ()=> {
    alert.classList.add('show-alert');
    setTimeout(()=> {
        alert.classList.remove('show-alert');
    }, 3000)
}
//copy share link to clipBoard
const copyShareLink = (e) => {
  const link = e.target.parentElement.textContent;
  navigator.clipboard
    .writeText(link)
    .then((result) => {
        showAlert();
    })
    .catch((err) => console.log(err));
};
//sending file to the backend
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/file", {
    method: "POST",
    body: formData,
  });
  if (res.status === 200) {
    const result = await res.json();
    shareLinkContainer.style.display = "block";
    const p = createHtmlElement("p", result.share);
    const i = createHtmlElement("i", "");
    i.className = "fa fa-copy copy-icon";
    i.addEventListener("click", copyShareLink);
    LinkContainer.appendChild(p);
    LinkContainer.appendChild(i);
  } else {
    console.log(res);
  }
};

const createHtmlElement = (element, textContent) => {
  const el = document.createElement(element);
  el.textContent = textContent;
  return el;
};

