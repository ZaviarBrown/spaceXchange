const getter = async () => {
    let data = await localStorage.getItem("totals") ? localStorage.getItem("totals") : []
    return data
}
export default getter