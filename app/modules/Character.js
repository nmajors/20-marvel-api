class Character {
  constructor(name = "Captain America") {
    this.name = name;
    this.getData();
  }

  render() {
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

  getData() {
    const apiKey = "ed7601d2962065f2fc12241cbc32a585";
    fetch(`http://gateway.marvel.com:80/v1/public/characters?name=${encodeURI(this.name)}&apikey=${apiKey}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // console.log(response);
        let results = response.data.results[0];
        this.name = results.name;
        this.id = results.id;
        this.description = results.description;
        this.image = `${results.thumbnail.path}.${results.thumbnail.extension}`;
        this.render();
        this.getEventData();

      })
  }
  getEventData() {
    const apiKey = "ed7601d2962065f2fc12241cbc32a585";
    fetch(`http://gateway.marvel.com/v1/public/characters/${encodeURI(this.id)}/events?apikey=${apiKey}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.events = response.data.results;
        this.renderEvents();
      })
  }
  renderEvents() {
    let events = this.events;

    let placeholderRight = document.querySelector("#placeholderRight");
    let eventsHeadline = document.createElement("h1");
    eventsHeadline.textContent = "Events";
    placeholderRight.appendChild(eventsHeadline);

    events.forEach((event) => {

      let a = document.createElement("a");
      a.classList.add("itemContainer");
      a.href = `/events/${event.id}`;
      placeholderRight.appendChild(a);

      let image = document.createElement("img");
      image.classList.add("itemTitle");
      image.src = `${event.thumbnail.path}.${event.thumbnail.extension}`;
      a.appendChild(image);

      let itemTitle = document.createElement("h1");
      itemTitle.classList.add("itemTitle");
      itemTitle.textContent = `${event.title}`;
      a.appendChild(itemTitle);


    })

  }
}

// if(name === undefined){
//   this.name = 'Captain America'
// }else{
//   this.name = name;
// }

export default Character;
