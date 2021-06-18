// Use linked list and algorithm to check the value of previous coin flip
    // Previous flip influences next

    /* 
        if prev flip == curr flip:
                                    .25                      .25                   
            const choices [trend for 3 iterations, trend for 5 iterations, opposite trend for 3, opp trend for 5]


*/


const prices = {
    a: 1,
    b: 20,
    c: 300,
    d: 4000,
    e: 50000,
    f: 600000,
    g: 7000000,
}

const vol = {
    a: 0.001,
    b: 0.01,
    c: 0.05,
    d: 0.02,
    e: 0.9,
    f: 0.00001,
    g: 0.09,
}

const coinFlip = () => {
    flip = Math.floor(Math.random() * 10)
    return flip > 4 ? true : false
}

const algo = (obj, obj2) => {
    let num
    for (let key in obj) {
        num = (Math.random() * obj2[key])
        newNum = obj[key] * num
        flip = coinFlip()
        obj[key] = (flip ? newNum + obj[key] : obj[key] - newNum)
    }
    console.log(prices)
}

setInterval(() => algo(prices, vol), 1000)



/****************** Using the ago ******************
Algo does not need to run on all stocks at once

Let's say we have a page displaying every available stock:

    On very first load, query database and use most up-to-date price.

    Take all prices and save them into a global object in App

    Run algo on this object, updating the price inside object based on 
    algo output

        The output of this algo allows us to show dynamically changing stock
        prices for every stock on the page
    

Then, when the user clicks on a specific stock:
    
    The algo is stopped, the global object is saved.

    On click the current price from the object is passed to the new route

    That stock price is displayed as the current price

    Start the algorithm again on ONLY the current page's stock

    Update the on-screen price based on algo output

    User clicks away from this screen, back to main screen

        Pass the current price of current stock on click

        Update the global object with new stock price

        Run algo again on entire object


Algo can run on only the user's current page, updating the price live.
    When the user navigates away from the page, 
*/