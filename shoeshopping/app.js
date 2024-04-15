// import {clothes} from './db'
function loadHomePage() {
  fetch('home.html')
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to load home page');
          }
          return response.text();
      })
      .then(html => {
          document.getElementById('main').innerHTML = html;
      })
      .catch(error => {
          console.error('Error loading home page:', error);
      });
}
function loadSigninPage() {
  fetch('signin.html')
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to load home page');
          }
          return response.text();
      })
      .then(html => {
          document.getElementById('main').innerHTML = html;
      })
      .catch(error => {
          console.error('Error loading home page:', error);
      });
}
function loadSignupPage() {
  fetch('signup.html')
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to load home page');
          }
          return response.text();
      })
      .then(html => {
          document.getElementById('main').innerHTML = html;
      })
      .catch(error => {
          console.error('Error loading home page:', error);
      });
}
function handleRouting() {
  const path = window.location.pathname;

  switch (path) {
      case '/':
          loadHomePage();
          break;
      case '/signin':
          loadSigninPage();
          break;
      case '/signup':
        loadSignupPage()
          break;
      case '/home':
          loadHomePage();
          break;
      default:
          renderNotFound();
  }
}

window.addEventListener('popstate', handleRouting);

handleRouting();
const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products=clothes
console.log(products)

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");
console.log(menuItems)
menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    //assing new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

// Function to load the content of home.html

