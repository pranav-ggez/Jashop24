document.addEventListener("DOMContentLoaded", function () {
  function loadSignupPage() {
    fetch("signup.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load sign-up page");
        }
        return response.text();
      })
      .then((html) => {
        document.getElementById("main").innerHTML = html;
        const signupForm = document.getElementById("signup-form");
        signupForm.addEventListener("submit", function (event) {
          event.preventDefault();

          const formData = new FormData(signupForm);
          email = formData.get("email");
          name = formData.get("name");
          const password = formData.get("password");

          fetch("/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Sign-up failed");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Sign-up successful:", data);
              window.location.href = "http://localhost:3000/login";
            })
            .catch((error) => {
              console.error("Sign-up error:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error loading sign-up page:", error);
      });
  }

  function loadCart() {
    fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) throw new Error("Failed to load profile");
        return response.json();
      })
      .then((data) => {
        if (!data.error) {
          fetch("/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (!res.ok) return console.error("Error");
              const navbar = document.querySelector(".navLinks");
              navbar.innerHTML = `<a class="navItem" href="/cart">
                      <div class="navItem">
                        <span class="limitedOffer">Cart</span>
                      </div>
                    </a>
                    <button class="navItem" id="logout">
                      <div class="navItem">
                        <span class="limitedOffer">Logout</span>
                      </div>
                    </button>`;
              
              document
                .getElementById("logout")
                .addEventListener("click", function () {
                  console.log("click");
                  fetch("http://localhost:3000/api/logout", {
                    method: "POST",
                  }).then((response) => {
                    if (response.ok) {
                      window.location.href = "/login"; 
                    } else {
                      console.error("Logout failed");
                    }
                  });
                });
              return res.json();
            })
            .then((data) => {
              fetch("/api/fetchcart", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: data.name,
                  email: data.email,
                }),
              })
                .then((data) => data.json())
                .then((data) => {
                  console.log(data);
                  document.getElementById("main").innerHTML = "";
                  data.cart.cartItems.forEach((cart) => {
                    let html = document.getElementById("main").innerHTML;
                    document.getElementById("main").innerHTML =
                      html +
                      `
                  <div class="cart-item">
                    <img src="${cart.colors[0].img}" alt="Product Image" class="cart-item-image">
                    <div class="cart-item-details">
                      <h2 class="cart-item-title">${cart.title}</h2>
                      <p class="cart-item-price">₹${cart.price}</p>
                    </div>
                    <button class="cart-item-remove">Remove</button>
                  </div>
                  `;
                  });
                  let html = document.getElementById("main").innerHTML;
                  document.getElementById("main").innerHTML =
                    html +
                    `<div class="payment">
                    <h1 class="payTitle">Personal Information</h1>
                    <label>Name and Surname</label>
                    <input type="text" placeholder="John Doe" class="payInput" />
                    <label>Phone Number</label>
                    <input type="text" placeholder="+1 234 5678" class="payInput" />
                    <label>Address</label>
                    <input type="text" placeholder="Elton St 21 22-145" class="payInput" />
                  
                    <h1 class="payTitle">Payment Method</h1>
                    <label>
                      <input type="radio" name="paymentMethod" value="cod" checked> Cash on Delivery
                    </label>
                    <label>
                      <input type="radio" name="paymentMethod" value="online"> Online Payment
                    </label>
                  
                    <div id="upiField" style="display: none;">
                      <label>UPI Address</label>
                      <input type="text" placeholder="Enter UPI Address" class="payInput" />
                    </div>
                  
                    <button class="payButton">Checkout!</button>
                    <span class="close">X</span>
                  </div>`;
                  let htmls = document.getElementById("main").innerHTML;
                  document.getElementById("main").innerHTML =
                    htmls +
                    `<div>
                      <button class="productButton">Checkout</button>
                    </div>`;
                  const paybutton = document.querySelector(".productButton");
                  const payment = document.querySelector(".payment");
                  paybutton.addEventListener("click", () => {
                    payment.style.display = "flex";
                  });
                  const paymentMethodRadios =
                    document.getElementsByName("paymentMethod");
                  const upiField = document.getElementById("upiField");

                  paymentMethodRadios.forEach((radio) => {
                    radio.addEventListener("change", function () {
                      if (this.value === "online") {
                        upiField.style.display = "block"; 
                      } else {
                        upiField.style.display = "none"; 
                      }
                    });
                  });

                  const close = document.querySelector(".close");
                  const paymentDiv = document.querySelector(".payment");

                  close.addEventListener("click", function () {
                    paymentDiv.style.display = "none"; 
                  });
                });
            });
        } else {
          document.getElementById("main").innerHTML = "<p>Login First</p>";
        }
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
        signinForm.addEventListener("submit", function (event) {
          event.preventDefault();

          const formData = new FormData(signinForm);
          const email = formData.get("email");
          const password = formData.get("password");

          fetch("/api/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Sign-in failed");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Sign-in successful:", data);
              window.location.href = "http://localhost:3000/";
            })
            .catch((error) => {
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
        fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            console.log(response);
            if (!response.ok) throw new Error("Failed to load profile");
            return response.json();
          })
          .then((data) => {
            if (!data.error) {
              const navbar = document.querySelector(".navLinks");
              navbar.innerHTML = `<a class="navItem" href="/cart">
                      <div class="navItem">
                        <span class="limitedOffer">Cart</span>
                      </div>
                    </a>
                    <button class="navItem" id="logout">
                      <div class="navItem">
                        <span class="limitedOffer">Logout</span>
                      </div>
                    </button>`;
              
              document
                .getElementById("logout")
                .addEventListener("click", function () {
                  console.log("click");
                  fetch("http://localhost:3000/api/logout", {
                    method: "POST",
                  }).then((response) => {
                    if (response.ok) {
                      window.location.href = "/login"; 
                    } else {
                      console.error("Logout failed");
                    }
                  });
                });
            }
          });
        fetch("http://localhost:3000/api/returnClothes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            console.log(res);
            return res.json();
          })
          .then((products) => {
            console.log(products);

            const slider = document.querySelector(".sliderWrapper");
            const productCard = document.querySelector(".product");
            products.forEach((product) => {
              console.log(product);
              slider.innerHTML += `
              <div class="sliderItem">
                    <img src="${product.colors[0].img}" alt="" class="sliderImg">
                    <div class="sliderBg"></div>
                    <h1 class="sliderTitle">${product.title}</br> NEW</br> SEASON</h1>
                    <h2 class="sliderPrice">₹${product.price}</h2>
                     <a href="#product">
                         <button class="buyButton">BUY NOW!</button> 
                    </a>
                    <button class="addToCartButton" id="${product.id}">Add To Cart</button>
                </div>
              `;
              
              productCard.innerHTML += `
              <div class="productCard">
          <img src="${product.colors[0].img}" alt="" class="productImg" />
          <div class="productDetails">
            <h1 class="productTitle">${product.title}</h1>
            <h2 class="productPrice">₹${product.price}</h2>
            <p class="productDesc">
              Lorem ipsum dolor sit amet consectetur impal adipisicing elit.
              Alias assumenda dolorum doloremque sapiente aliquid aperiam.
            </p>
            <button class="productButton">BUY NOW!</button>
            <button class="addToCartProductButton" id="${
              product.id + 5
            }">Add To Cart</button>
          </div>
        </div>
              `;
            });
            const sliderWrapper = document.querySelector(".sliderWrapper");
            const sliderItems = document.querySelectorAll(".sliderItem");
            const totalItems = sliderItems.length; 
            const slideWidth = 100; 
            let currentIndex = 0; 

            
            function updateSliderPosition() {
              
              const offset = -currentIndex * slideWidth;
              sliderWrapper.style.transform = `translateX(${offset}vw)`;
            }

            
            function slideLeft() {
              if (currentIndex > 0) {
                currentIndex -= 1; 
                updateSliderPosition(); 
              }
            }

            
            function slideRight() {
              if (currentIndex < totalItems - 1) {
                currentIndex += 1; 
                updateSliderPosition(); 
              }
            }

            
            const slideLeftButton = document.getElementById("slideLeft");
            const slideRightButton = document.getElementById("slideRight");

            slideLeftButton.addEventListener("click", () => {
              console.log("Slide Left Button clicked");
              slideLeft();
            });

            slideRightButton.addEventListener("click", () => {
              console.log("Slide Right Button clicked");
              slideRight();
            });
            const menuItems = document.querySelectorAll(".menuItem");
            const productButton = document.querySelector(".productButton");
            const payment = document.querySelector(".payment");
            console.log(payment);
            const close = document.querySelector(".close");
            const addToCart = document.querySelectorAll(".addToCartButton");
            addToCart.forEach((btn) => {
              btn.addEventListener("click", () => {
                console.log(btn.id);
                id = +btn.id % 5;
                id == 0 ? (id = 5) : id;

                fetch("http://localhost:3000/api/user", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                })
                  .then((response) => {
                    console.log(response);
                    if (!response.ok) throw new Error("Failed to load profile");
                    return response.json();
                  })
                  .then((data) => {
                    console.log(data);
                    if (!data.error) {
                      fetch("/api/AddToCart", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          name: data.name,
                          email: data.email,
                          id: id,
                        }),
                      })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error("Adding failed");
                          }
                          return response.json();
                        })
                        .then((data) => {
                          console.log("Adding successful:", data);
                        })
                        .catch((error) => {
                          console.error("Adding Failed", error);
                        });
                    } else {
                      console.error("Login First");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });
            });
            const productAddToCart = document.querySelectorAll(
              ".addToCartProductButton"
            );
            productAddToCart.forEach((btn) => {
              btn.addEventListener("click", () => {
                console.log(btn.id);
                id = +btn.id % 5;
                id == 0 ? (id = 5) : id;

                fetch("http://localhost:3000/api/user", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                })
                  .then((response) => {
                    console.log(response);
                    if (!response.ok) throw new Error("Failed to load profile");
                    return response.json();
                  })
                  .then((data) => {
                    console.log(data);
                    if (!data.error) {
                      fetch("/api/AddToCart", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          name: data.name,
                          email: data.email,
                          id: id,
                        }),
                      })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error("Adding failed");
                          }
                          return response.json();
                        })
                        .then((data) => {
                          console.log("Adding successful:", data);
                        })
                        .catch((error) => {
                          console.error("Adding Failed", error);
                        });
                    } else {
                      console.error("Login First");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });
            });
            productButton.addEventListener("click", () => {
              payment.style.display = "flex";
            });

            close.addEventListener("click", () => {
              payment.style.display = "none";
            });
          });
        break;
      case "/login":
        loadSigninPage();
        break;
      case "/signup":
        loadSignupPage();
        break;
      case "/cart":
        loadCart();
        break;
      default:
        document.getElementById("main").innerHTML =
          "<h1>Error 404 Not Found</h1>";
    }
  }

  window.addEventListener("popstate", handleRouting);

  handleRouting();
  const sliderWrapper = document.querySelector(".sliderWrapper");
  const sliderItems = document.querySelectorAll(".sliderItem");
  const totalItems = sliderItems.length; 
  const slideWidth = 100; 
  let currentIndex = 0; 

  
  function updateSliderPosition() {
    
    const offset = -currentIndex * slideWidth;
    sliderWrapper.style.transform = `translateX(${offset}vw)`;
  }

  
  function slideLeft() {
    if (currentIndex > 0) {
      currentIndex -= 1; 
      updateSliderPosition(); 
    }
  }

  
  function slideRight() {
    if (currentIndex < totalItems - 1) {
      currentIndex += 1; 
      updateSliderPosition(); 
    }
  }

  
  const slideLeftButton = document.getElementById("slideLeft");
  const slideRightButton = document.getElementById("slideRight");

  slideLeftButton.addEventListener("click", () => {
    console.log("Slide Left Button clicked");
    slideLeft();
  });

  slideRightButton.addEventListener("click", () => {
    console.log("Slide Right Button clicked");
    slideRight();
  });
  const menuItems = document.querySelectorAll(".menuItem");
});
