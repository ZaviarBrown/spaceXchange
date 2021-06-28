
{
    (() => {
        let pricesArr = []
        ownedAssets.forEach((asset, i) => {
            let shares = asset?.shares
            let name = asset.planetName.toLowerCase()
            let price = pricesCtxt[name]?.price
            let total = shares * price
            if (!(isNaN(total))) {
                pricesArr.push(total)
            }
            if (i === ownedAssets.length - 1) {
                let assetsTotal = pricesArr.reduce((acc, el) => {
                    return el += acc
                }, 0).toFixed(4)
                if (assetsTotal != 0) {
                    let date = new Date(Date.now())
                    date = date.toString().split(' ')[4]
                    totalsArr.push({ name: date, price: assetsTotal })
                    {/* checkerArr.push({ name: date, price: assetsTotal }) */ }
                }
            }

            localStorage.setItem("totals", JSON.stringify(totalsArr))
        })
    })()
}
