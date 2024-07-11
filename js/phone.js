function loadPhone(searchText,isShowAll){
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayPhones(data.data,isShowAll));
}

function displayPhones(phones,isShowAll){
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container card before adding new card
    phoneContainer.textContent='';
    // display show all button if there are more than 12 phone
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll)
      {
        showAllContainer.classList.remove('hidden')
      }
      else
      {
        showAllContainer.classList.add('hidden')
      }

    // display only 12 phones
    if(!isShowAll){
    phones = phones.slice(0,12);
    }
    

    // console.log(phones.length);
   for(const phone of phones)
    {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-red-100 p-4 shadow-xl`;
        phoneCard.innerHTML = `
        <figure>
                      <img class="mt-5"
                        src="${phone.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}')"  class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `
        phoneContainer.appendChild(phoneCard);
    }

    // hide Loading Spinner
    toggleLoadingSpinner(false);
    
}

// handle search button
function handleSearch(isShowAll){
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  
  loadPhone(searchText,isShowAll);
}




// handle search recap
// function handleSearch2(){
//   toggleLoadingSpinner(true);
//   const searchField2 = document.getElementById('search-field2');
//   const searchValue = searchField2.value;
//   loadPhone(searchValue);

// }

function toggleLoadingSpinner(isLoading)
{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading)
  {
    loadingSpinner.classList.remove('hidden');  
  }
  else
  {
    loadingSpinner.classList.add('hidden')
  }
}


// Handle Show Detail
function handleShowDetail(id)
{
  // console.log(id);
  // load single data
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  .then(res => res.json())
  .then(data => showPhoneDetails(data.data));
}

// Show Phone Detail
function showPhoneDetails(phone)
{
  console.log(phone)
  const phoneName = document.getElementById('show-details-phone-name');
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
    <img src="${phone.image}"/>
    <p>Storage: ${phone?.mainFeatures?.storage} </p>
    <p>Display Size: ${phone?.mainFeatures?.displaySize} </p>
    <p>Chip Set: ${phone?.mainFeatures?.chipSet} </p>
    <p>Slug: ${phone?.slug} </p>
  `

  
  // show the Modal
  show_details_modal.showModal();

}

// handle show all
function handleShowAll()
{
  handleSearch(true);
}

