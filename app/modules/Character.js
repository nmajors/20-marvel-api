let apiKey = "ed7601d2962065f2fc12241cbc32a585";
class Character {
  constructor(name) {
    this.name = "Captain America",
      this.getData();
  }
  getData() {
    fetch(`http://gateway.marvel.com:80/v1/public/characters?name=${this.name}&apikey=${apiKey}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);

        let results = response.data.results[0];
        this.name = results.name;
        this.id = results.id;
        this.description = results.description;
        this.image = `${results.thumbnail.path}.${results.thumbnail.extension}`;
        this.render();
      });
  }
  render () {


    let placeholderLeft = document.querySelector("#placeholderLeft");
    let profileImage = document.createElement("img");
      profileImage.classList.add("profileImage");
      profileImage.src = this.image;
      placeholderLeft.appendChild(profileImage);

    let profileName = document.createElement("h2");
      profileName.classList.add("profileName");
      profileName.textContent = this.name;
      placeholderLeft.appendChild(profileName);

    let profileDescription = document.createElement("p");
      profileDescription.classList.add("profileDescription");
      profileDescription.textContent = this.description;
      placeholderLeft.appendChild(profileDescription);


  }
}

// if(name === undefined){
//   this.name = 'Captain America'
// }else{
//   this.name = name;
// }

export default Character;
