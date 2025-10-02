const loadCategory = ()=> {
    const url = "https://taxi-kitchen-api.vercel.app/api/v1/categories";

    fetch(url).then(res=>res.json())
    .then(data => displayCategory(data.categories) );
};

const loadFoods= (id) =>{
    document.getElementById("food-container").classList.add("hidden");
    document.getElementById("loading-spinner").classList.remove("hidden");
//    console.log("Load foods called" , id) ;
   const url =id ? `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`
   :`https://taxi-kitchen-api.vercel.app/api/v1/foods/random`;
//    console.log(url);
// 1.sobaike niye eshe active class remove kore daw
const catBtns = document.querySelectorAll(".btn-category");
catBtns.forEach(btn => btn?.classList?.remove("active"));
// 2.jake click  hoise take active class daw 
const currentBtn = document.getElementById(`cat-btn-${id}`);
    console.log(currentBtn);
    currentBtn?.classList?.add("active");
fetch(url).then(res => res.json())
.then(data => displayFoods(data.foods));
}

const loadFoodDetails = (id) =>{
    // console.log("Food details dekhte chai",id);
    const url = ` https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`;
    
    fetch(url).then((res)=>res.json())
    .then((data) => displayDetails(data.details));

}



const loadRandomData = ()=>{
    const url = "https://taxi-kitchen-api.vercel.app/api/v1/foods/random";
    
    fetch(url).then(res => res.json())
    .then(data => displayFoods(data.foods));
}

let cart = [];
let total =0;

const displayCategory = (categories) => {
// console.log(categories);
// 1.jekhane rakhbo seta k dhore nia asbo 
const catContainer = document.getElementById("category-container");
catContainer.innerHTML="";
for(let cat of categories){
    // console.log(cat)
    // 2. create html element 
    const categoryCard = document.createElement("div");
    categoryCard.innerHTML = `
    <button id="cat-btn-${cat.id}" onclick="loadFoods(${cat.id})" class="btn justify-start btn-block shadow btn-category">
            <img
              src="${cat.categoryImg}"
              alt=""
              class="w-10"
            />${cat.categoryName}
          </button>
    `;

    // 3.Append the element
    catContainer.append(categoryCard);
}
}
const displayFoods = (foods) =>{
// console.log(foods);
const foodContainer = document.getElementById("food-container");
foodContainer.innerHTML="";

foods.forEach((food) => {
    const foodCard = document.createElement("div");
    foodCard.innerHTML= `
     <div  class="p-5 bg-white flex gap-3 shadow rounded-xl">
            <div class="img flex-1">
              <img
                src="${food.foodImg}"
                alt=""
                class="w-[160px] rounded-xl h-[160px] object-cover food-img"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold food-title">
                ${food.title}
              </h1>

              <div class="badge badge-warning">${food.category}</div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="food-price">${food.price}</span> BDT
                </h2>
              </div>


              <div class="flex justify-between">
              <button onclick="loadFoodDetails(${food.id})" class="btn btn-warning ">
                <i class="fa-solid fa-circle-info"></i>
                Show Food Details
              </button>

              <button onclick="addToCart(this)" class="btn btn-warning ">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>

              </div>
              
            </div>
          </div>
    `;
    foodContainer.append(foodCard);
})
  document.getElementById("food-container").classList.remove("hidden");
    document.getElementById("loading-spinner").classList.add("hidden");
}
const displayDetails = (food)=>{
// console.log(food)
const detailsContainer = document.getElementById("details-container");
detailsContainer.innerHTML="";
detailsContainer.innerHTML = `
<div>
<h2 class="text-3xl font-bold text-center mb-2">${food.title}</h2>
</div>
<div class="">
      <img class="rounded-lg mb-4 "  src="${food.foodImg}" alt="">
    </div>
    <div class="flex justify-between items-center">
    <div class="badge badge-primary">
    ${food.area}
    </div>
    <a href="${food.video}" target="_blank" class="btn btn-warning ">Watch Video</a>
    </div>
`;
document.getElementById("my_modal_3").showModal();

}


loadCategory();
loadFoods();

// document.getElementById("food-container").addEventListener("click",(e)=>{
//  console.log(e.target)   
// })

const addToCart =(btn)=>{

    // console.log(btn)
const card = btn.closest(".p-5");
const foodTitle = card.querySelector(".food-title").innerText;
const foodImg = card.querySelector(".food-img").src;
const foodPrice = Number(card.querySelector(".food-price").innerText);

// console.log(foodTitle,foodImg,foodPrice);

const selectedItem = {
    foodTitle:foodTitle,
    foodImg: foodImg,
    foodPrice:foodPrice
};
cart.push(selectedItem);
total=total+foodPrice;
displayCart(cart);
displayTotal(total);

};
const displayTotal=(val)=>{
    document.getElementById("cart-total").innerHTML = val;
}
displayCart =  (cart)=>{
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";

    for(let item of  cart){
        // console.log(item);
        const newItem =document.createElement("div");
        newItem.innerHTML= `
        <div class="p-1 bg-white flex gap-3 shadow rounded-xl relative">
            <div class="img">
              <img
                src="${item.foodImg}"
                alt=""
                class="w-[50px] rounded-xl h-[50px] object-cover"
              />
            </div>
            <div class="flex-1">
              <h1  class="text-xs font-bold food-title">
                ${item.foodTitle}
              </h1>

              <div class="">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="price">${item.foodPrice}</span> BDT
                </h2>
              </div>
            </div>
            <div onclick="removeCart(this)"
              class="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full absolute -top-1 -right-1 text-white cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
        `;
        cartContainer.append(newItem);

    }
};

const removeCart=(btn)=>{
    const item = btn.parentNode;
    const foodTitle =item.querySelector(".food-title").innerText;
    cart = cart.filter(item => item.foodTitle != foodTitle)
    displayCart(cart);
    // console.log(foodTitle);
}