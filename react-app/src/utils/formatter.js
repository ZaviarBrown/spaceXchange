

// USD numberFormatter

const F = (num) => {
    let usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return usdFormatter.format(num)
}

export const F2 = (num) => {
    let usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    let form = usdFormatter.format(num)
    return form.split('$').join('').split(',').join('')
}

export const F3 = (num) => {
    let usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 4,
    });
    let form = usdFormatter.format(num)
    return form.split('$').join('').split(',').join('')
}

export const F4 = (num) => {
    let usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 4,

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    let form = usdFormatter.format(num)
    return form
}

export default F