const params = new URLSearchParams(window.location.search);
const product_Id = params.get('id');


// DOMS
const product_thumbnail = document.querySelector('#product_thumbnail')
const product_title = document.querySelector('#product_title')
const product_description = document.querySelector('#product_description')
const product_brand = document.querySelector('#product_brand')
const product_rating = document.querySelector('#product_rating')
const product_price = document.querySelector('#product_price')
const product_discount = document.querySelector('#product_discount')
const ratings_and_reviews = document.querySelector('#ratings_and_reviews')


getProductDetails()
function getProductDetails(){

    fetch('https://dummyjson.com/products/'+product_Id)
    .then(response => response.json())
    .then(data => {
        product_thumbnail.setAttribute('src',data.thumbnail)
        product_title.innerHTML = data.title
        product_description.innerHTML = data.description
        product_brand.innerHTML = data.brand
        product_rating.innerHTML = data.rating
        product_price.innerHTML = `$${data.price}`

        var actual_price = (data.price * (data.discountPercentage * .01)) + data.price
        product_discount.innerHTML = `<del class="text-muted">$${actual_price.toFixed(2)}</del> ${data.discountPercentage}%`
        
        var reviews = ''
        data.reviews.forEach(review => {
            reviews +=`<div class="comments border p-3 mb-3">
                        <p>${review.rating}</p>
                        <p><strong>${review.reviewerName}</strong></p>
                        <div class="text-muted">${review.date}</div>
                        <p>${review.comment}</p>
                    </div>`
        })

        ratings_and_reviews.innerHTML = reviews


    })
}