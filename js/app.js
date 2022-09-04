const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesConatiner = document.getElementById("phones-container");
  //   innerHtml, innerText o use kora jabe ekhane
  phonesConatiner.textContent = "";
  //   phoner sonkha jdi 10 er ceye beshi hoy thle joto gula phone ase tar thke first 10ta dekhbe and show all button show korbe
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  //   - no phone found message here
  const noPhoneMessage = document.getElementById("no-phone-message");
  if (phones.length === 0) {
    noPhoneMessage.classList.remove("d-none");
  } else {
    noPhoneMessage.classList.add("d-none");
  }
  //   - display phones here
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card">
        <img src="${phone.image}" class="card-img-top p-4" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
                <a onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</a>
        </div>
    </div>
    `;
    phonesConatiner.appendChild(phoneDiv);
  });
  //! stop spinner
  toggleSpinner(false);
};

// - common search functionality here
const searchPorcess = (dataLimit) => {
  toggleSpinner(true);
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  loadPhones(searchText, dataLimit);
};
// - search button here
document.getElementById("btn-search").addEventListener("click", function () {
  //! start spinner
  searchPorcess(10);
});
// - input er betore kichu likhe enter dile search hobe button e click korar drkr porbe na -- upore button functionality oitate click korle o same kaj korbe
document
  .getElementById("search-input")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchPorcess(10);
    }
  });

// - loading spinner here
// start spinner --> search button e click korle spinner true hobe mane spinner chalu hobe || stop spinner --> no phone found message, display phones shob kaj sesh howar por appendChild korar por spinner kaj kora off kore dibe
const toggleSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  // isLoading true hoile d-none class remove kore dibe ar false hoile d-none add kore dibo
  if (isLoading) {
    loadingSpinner.classList.remove("d-none");
  } else {
    loadingSpinner.classList.add("d-none");
  }
};
// - show all button here
document.getElementById("btn-show-all").addEventListener("click", function () {
  searchPorcess();
});

// - card er betorer show details button er kaj
const loadPhoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};
//* modal er betore text set kortesi
const displayPhoneDetails = (phone) => {
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = phone.name;
  const modalBody = document.getElementById("phone-modal-body");
  //   jehetu notun element create kori nai tai append korar proyojon nai
  //   ekhne storage er moddhe template literal use korsi --> phone.mainFeatures er moddhe jodi storage thke thle dekhaw ar na thakle message ta dekhaw
  modalBody.innerHTML = `
  <h5>Chip: ${phone.mainFeatures.chipSet}</h5>
  <p>Storage: ${
    phone.mainFeatures ? phone.mainFeatures.storage : "No storage info"
  }</p>
  <p>Display: ${phone.mainFeatures.displaySize}</p>
  <h6>Release: ${phone.releaseDate}</h6>
  `;
};
loadPhones("a");
