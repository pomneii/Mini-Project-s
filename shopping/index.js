var product = [{
        id: 1,
        img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Nike',
        price: 7000,
        description: 'Nike ipsum dolor sit amet consectetur adipisicing elit. Quidem, asperiores optio consectetur dolorum veritatis eaque.',
        type: 'shoes'
    },
    {
        id: 2,
        img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: '705',
        price: 700,
        description: '705 ipsum dolor sit amet consectetur adipisicing elit. Quidem, asperiores optio consectetur dolorum veritatis eaque.',
        type: 'shirt'
    },
    {
        id: 3,
        img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'jeans',
        price: 400,
        description: 'jeans ipsum dolor sit amet consectetur adipisicing elit. Quidem, asperiores optio consectetur dolorum veritatis eaque.',
        type: 'shorts'
    }];

$(document).ready(() => {
    var html = '';
    for (let i = 0 ; i < product.length ; i++) {
        html += `<div onclick="openProductsDetail(${i})" class="products-items ${product[i].type}">
                    <img class="products-img" src="${product[i].img}" alt="">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p style="font-size: 1vw;">${numberWithCommas(product[i].price)} THB</p>
                 </div>`;
    }
    $("#product-list").html(html);
})

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function search_products(elements) {
    // console.log(elements.id)
    var value = $('#' + elements.id).val()

    var html = '';
    for (let i = 0 ; i < product.length ; i++) {
        if (product[i].name.includes(value)) {
            html += `<div onclick="openProductsDetail(${i})" class="products-items ${product[i].type}">
                    <img class="products-img" src="${product[i].img}" alt="">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p style="font-size: 1vw;">${numberWithCommas(product[i].price)} THB</p>
                 </div>`;
        }
    }
    if (html == '') {
        $("#product-list").html(`<p>Not found products</p>`);
    } else {
        $("#product-list").html(html);
    }
}

function search_items(param) {
    console.log(param)
    $(".products-items").css('display', 'none')
    if (param == 'all') {
        $(".products-items").css('display', 'block')
    } else {
        $("." + param).css('display', 'block')
    }
}

var product_index = 0
function openProductsDetail(index) {
    product_index = index
    $("#modal-Desc").css('display', 'flex')
    $("#mdd-img").attr('src', product[index].img);
    $("#mdd-name").text(product[index].name);
    $("#mdd-price").text(numberWithCommas(product[index].price) + " THB");
    $("#mdd-desc").text(product[index].description);
}

function closeModal() {
    $(".modal").css('display', 'none')
}

var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0 ; i < cart.length ; i++) {
        if (product_index == cart[i].index) {
            console.log("Found same product")
            cart[i].count++;
            pass = false
        }
    }

    if (pass) {
        var obj = {
            index: product_index,
            id: product[product_index].id,
            name: product[product_index].name,
            price: product[product_index].price,
            img: product[product_index].img,
            count: 1
        };
        console.log(obj)
        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'Add ' + product[product_index].name + " to Cart!"

    })

    $("#cart-count").css('display', 'flex').text(cart.length)
}

function opencart() {
    $("#modal-cart").css('display', 'flex')
    rendercart();
}

function rendercart() {
    if (cart.length > 0) {
        var html = ''
        for (let i = 0 ; i < cart.length ; i++) {
            html += `<div class="cart-list-items">
                        <div class="cart-list-left">
                            <img src="${cart[i].img}">
                            <div class="cart-list-detail">
                                <p style="font-size: 1.3vw;">${cart[i].name}</p>
                                <P style="font-size: 1.1vw;">${numberWithCommas(cart[i].price * cart[i].count)} THB</P>
                            </div>
                        </div>
                        <div class="cart-list-right">
                            <p onclick="indeitems('-', ${i})" class="btnc">-</p>
                            <p id="countitem${i}" style="margin: 0 20px;">${cart[i].count}</p>
                            <p onclick="indeitems('+', ${i})" class="btnc">+</p>
                        </div>
                     </div>`
        }
        $("#my-cart").html(html)
    } else {
        $("#my-cart").html(`<p>Not found product list</p>`)
    }
}

function indeitems(action, index) {
    if (action == '-') {
        if (cart[index].count > 0) {
            cart[index].count--;
            $("#countitem" + index).text(cart[index].count)
            if (cart[index].count <= 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Are you sure to delete?",
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                    if (res.isConfirmed) {
                        cart.splice(index, 1);
                        console.log(cart);
                        rendercart();
                        $("#cart-count").css('display', 'flex').text(cart.length)
                        
                        if (cart.length <= 0) {
                            $("#cart-count").css('display', 'none')
                        }
                    } else {
                        cart[index].count++;
                        $("#countitem" + index).text(cart[index].count)

                    }
                })
            }
            rendercart();

        }
    } else if (action == '+') {
        cart[index].count++;
        $("#countitem" + index).text(cart[index].count)
        rendercart()
    }

}