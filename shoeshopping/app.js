document.addEventListener("DOMContentLoaded", function() {
  function loadHomePage() {
      fetch("home.html")
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Failed to load home page");
              }
              return response.text();
          })
          .then((html) => {
              document.getElementById("main").innerHTML = html;
          })
          .catch((error) => {
              console.error("Error loading home page:", error);
          });
  }

  function loadSigninPage() {
    fetch("signin.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load sign-up page");
            }
            return response.text();
        })
        .then((html) => {
            document.getElementById("main").innerHTML = html;
        })
        .catch((error) => {
            console.error("Error loading sign-up page:", error);
        });
}

function loadSigninPage() {
  fetch("signin.html")
      .then((response) => {
          if (!response.ok) {
              throw new Error("Failed to load sign-in page");
          }
          return response.text();
      })
      .then((html) => {
          document.getElementById("main").innerHTML = html;
          const signinForm = document.getElementById("signin-form");
          signinForm.addEventListener("submit", function(event) {
              event.preventDefault();

              const formData = new FormData(signinForm);
              const email = formData.get("email");
              const password = formData.get("password");

              fetch("/api/signin", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ "email":email, "password":password })
              })
              .then(response => {
                  if (!response.ok) {
                      throw new Error("Sign-in failed");
                  }
                  return response.json();
              })
              .then(data => {
                  console.log("Sign-in successful:", data);
              })
              .catch(error => {
                  console.error("Sign-in error:", error);
              });
          });
      })
      .catch((error) => {
          console.error("Error loading sign-in page:", error);
      });
}

  function handleRouting() {
      const path = window.location.pathname;

      switch (path) {
          case "/":
            fetch("http://localhost:3000/api/returnClothes", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
          }).then((res) => {
              console.log(res);
              res.json().then((products) => {
                  let choosenProduct = products[0];
        
                  const currentProductImg = document.querySelector(".productImg");
                  const currentProductTitle = document.querySelector(".productTitle");
                  const currentProductPrice = document.querySelector(".productPrice");
                  const currentProductColors = document.querySelectorAll(".color");
                  const currentProductSizes = document.querySelectorAll(".size");
                  console.log(menuItems);
                  menuItems.forEach((item, index) => {
                      item.addEventListener("click", () => {
                          wrapper.style.transform = `translateX(${-100 * index}vw)`;
        
                          choosenProduct = products[index];
        
                          currentProductTitle.textContent = choosenProduct.title;
                          currentProductPrice.textContent = "$" + choosenProduct.price;
                          currentProductImg.src = choosenProduct.colors[0].img;
        
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
                  console.log(payment)
                  const close = document.querySelector(".close");
        
                  productButton.addEventListener("click", () => {
                      payment.style.display = "flex";
                  });
        
                  close.addEventListener("click", () => {
                      payment.style.display = "none";
                  });
              });
          });
          break;
          case "/login":
              loadSigninPage();
              break;
          case "/signup":
              loadSignupPage();
              break;
          default:
              renderNotFound();
      }
  }

  window.addEventListener("popstate", handleRouting);

  handleRouting();
  const wrapper = document.querySelector(".sliderWrapper");
  const menuItems = document.querySelectorAll(".menuItem");

  
});
