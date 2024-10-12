const category_list = document.querySelector('#category_list')
const products_container = document.querySelector('#products_container')



fetch('https://dummyjson.com/products/categories')
.then(response => {
    return response.json()
})
.then(data => {
    data.forEach(category => {
        var li = document.createElement('li')
        var a = document.createElement('a')
        a.href = '#'
        a.setAttribute('data-slug',category.slug)
        a.innerHTML = category.name

        // Add click event to every link

        a.addEventListener('click',function(e){
            getProducts(category.slug)
            return false
        })

        li.appendChild(a)
        category_list.append(li)
    })
})


function getProducts(slug){
    fetch('https://dummyjson.com/products/category/'+slug)
    .then( response => response.json())
    .then( data => {
        var products = data.products
        var html = ''
        products.forEach(product => {
            console.log(product)
            html+= `<div class="product" data-id="${product.id}">
                        <!-- <a href="product.html?id=${product.id}"> -->
                            <img src="${product.thumbnail}" alt="">
                            <div>${product.title}</div>
                            <div>${product.price}</div>
                            <div>${product.discountPercentage}%</div>
                            <div>${product.rating}</div>
                        <!-- </a> -->
                    </div>`
        })

        products_container.innerHTML = html

        const product_items = document.querySelectorAll('.product')

        product_items.forEach(product_item => {
            product_item.addEventListener('click',function(){
                var product_id = this.getAttribute('data-id')

                window.location.href='product.html?id='+product_id
            })
        })

    })
}

