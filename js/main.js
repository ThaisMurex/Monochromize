const ARTIST_INPUT = document.getElementById("input-artist");
const ALBUM_INPUT = document.getElementById("input-album");
const ALBUM_IMAGE = document.getElementById("album-img");
const ALBUM_NAME = document.getElementById("album-name");
const ALBUM_DESCRIPTION = document.getElementById("album-description");
const SUBMIT = document.getElementById("submit");
const LAMBDA_URL = "https://y22tcg9j99.execute-api.us-east-1.amazonaws.com/beta";


[ARTIST_INPUT, ALBUM_INPUT].forEach( (element) => {
  element.addEventListener("change", () => {
    if (element.value) {
      element.classList.add('is-valid'); 
      element.classList.remove('is-invalid');
    } else {
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');  
    } 
  })
});

SUBMIT.addEventListener("click", compileData);

async function compileData() {
  const DATA = [ARTIST_INPUT.value, ALBUM_INPUT.value]
  if (ARTIST_INPUT.value && ALBUM_INPUT.value) {
    console.log("Invoked Lambda")
    const albumArray = await invokeLambda(DATA, LAMBDA_URL);
    console.log(albumArray);
    ALBUM_IMAGE.src = albumArray.url;
    ALBUM_NAME.innerHTML = albumArray.description;
    ALBUM_DESCRIPTION.innerHTML = albumArray.info;
  }
}

async function invokeLambda(data = {}, url = LAMBDA_URL) {
  const response = await fetch(url, {
    method: 'POST', 
    body: JSON.stringify(data) 
  });
  return response.json();
}


 