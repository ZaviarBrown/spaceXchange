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
                }, 0)
                if (assetsTotal !== 0) {
                    totalsArr.push({ name: new Date(Date.now()), price: assetsTotal })
                }
            }
            console.log('totalsarr', totalsArr)
            localStorage.setItem("totals", JSON.stringify(totalsArr))
            {/* console.log(localStorage.getItem("totals")) */ }
            {/* console.log(`${asset.planetName} ${shares * price ? shares * price : "fetching..."}`, '\n\n\n\n') */ }
            {/* console.log('pricesArr', pricesArr && pricesArr) */ }
        })
    })()
}