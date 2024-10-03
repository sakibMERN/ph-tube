// console.log("video");
//1- Fetch , Load and Show catagories

//Create loadCatagories function
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.error(error));
};

// {category_id: '1001', category: 'Music'}

//Load category function
const loadCategoryVideo = (id) => {

  const allButtons = document.querySelectorAll(".category-btn");
  allButtons.forEach(btn => btn.classList.remove("active"));
  
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then(data => {
    const activeBtn = document.getElementById(`btn-${id}`)
    activeBtn.classList.add("active")
    displayVideos(data.category)
  })
  .catch(error => console.error(error))
}

//Load video details function
const videoDetails = async (videoId) => {
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
}

const displayDetails = (video) => {
  console.log(video.description);
  const detailsContent = document.getElementById("modal-content");
  
  detailsContent.innerHTML= `
  <img src="${video.thumbnail}" />
  <p class = "text-sm text-amber-800 font-semibold ">${video.description}</p>
  `
  //Way 1
  // document.getElementById("showModal-data").click();

  //way 2
  document.getElementById("customModal").showModal();

  //way 3
  // customModal.showModal();
  
}

//Create displayCatagories function
const displayCatagories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  //add data in html
  categories.forEach((item) => {
    // console.log(item);
    //create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id = "btn-${item.category_id}" onclick = "loadCategoryVideo(${item.category_id})" class = "btn category-btn">${item.category}</button>
    `
    // button.innerText = item.category;

    //add button to category container
    categoryContainer.appendChild(buttonContainer);
  });
};

//Create loadVideos function
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.error(error));
};

function getTime(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = parseInt(time % 3600);
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = parseInt(remainingSecond % 60);

    return `${hour} h ${minute} min ago`
}

const demoObj = {
  category_id: "1003",
  video_id: "aaae",
  thumbnail: "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
  title: "Inside Amy Schumer",
  authors: [
    {
      profile_picture: "https://i.ibb.co/YD2mqH7/amy.jpg",
      profile_name: "Amy Schumer",
      verified: "",
    },
  ],
  others: {
    views: "3.6K",
    posted_date: "15147",
  },
  description:
    "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy.",
};

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";

  // If no content in categories
  if(videos.length == 0){
    videosContainer.classList.remove("grid")
    videosContainer.innerHTML = `
    <div class = "min-h-[300PX] flex flex-col  items-center gap-5">
      <img src = "assets/Icon.png" class = "text-center"/>
      <h2 class = "text-3xl font-bold text-red-500">No content here in this Category</h2>
    </div>
    `
  }
  else{
    videosContainer.classList.add("grid")
  }
  videos.forEach((video) => {
    // console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact space-y-2";
    card.innerHTML = `
        <figure class = "h-[220px] relative">
            <img
            src= ${video.thumbnail}
            alt="Shoes"
            class = "h-full w-full object-cover"
            />
            ${
              video.others.posted_date?.length == 0
                ? ""
                : `<span class = "absolute right-2 bottom-2 bg-black rounded-xl text-xs text-white p-2">${getTime(video.others.posted_date)}</span>`
            }
            
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img src="${
                  video.authors[0].profile_picture
                }" class="w-10 h-10 rounded-full object-cover"/>
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class ="flex items-center gap-2">
                    <p class = "text-gray-500">${
                      video.authors[0].profile_name
                    }</p>
                    ${
                      video.authors[0].verified === true
                        ? `<img src="https://img.icons8.com/?size=48&id=63760&format=png" class="w-6 h-6"/>`
                        : ""
                    }
                    
                </div>
                <p class = "text-gray-500">${video.others.views} views</p>
                <p><button onclick = "videoDetails('${video.video_id}')" class = "btn btn-sm btn-error mt-2">Details</button></p>
            </div>
        </div>
        `;
    videosContainer.append(card);
  });
};

loadCatagories();
loadVideos();
