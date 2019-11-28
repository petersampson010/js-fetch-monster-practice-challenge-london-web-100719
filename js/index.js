document.addEventListener("DOMContentLoaded", function() {

    const URL = "http://localhost:3000/monsters"
    const MONSTER_FORM = document.querySelector('#create-monster')
    const MONSTER_CONTAINER = document.querySelector('#monster-container')
    const BACK = document.querySelector('#back')
    const FORWARD = document.querySelector('#forward')


    let i = 0

    let form = document.createElement('form')
    let formHeader = document.createElement('h2')
    formHeader.innerText = "Create a new monster here"
    let nameInput = document.createElement('input')
    nameInput.placeholder = "name"
    let ageInput = document.createElement('input')
    ageInput.placeholder = "age"
    let desInput = document.createElement('input')
    desInput.placeholder = "description"
    let formSubmit = document.createElement('button')
    formSubmit.type = "submit"
    formSubmit.innerText = "submit"


    form.appendChild(formHeader)
    form.appendChild(nameInput)
    form.appendChild(ageInput)
    form.appendChild(desInput)
    form.appendChild(formSubmit)
    MONSTER_FORM.appendChild(form)

    form.addEventListener("submit", function() {
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value,
                age: ageInput.value,
                description: desInput.value
            })
        }
        fetch(URL, configObj)
        .then(resp => resp.json())
        // .then(data => addToPage(data))

    })

    fetch(URL)
    .then(resp => resp.json())
    .then(data => data.slice(i, takeFifty()))
    .then(bitData => bitData.forEach(monster => addToPage(monster)))

    function takeFifty() {
        i = i + 50 
        return i 
    }

    function removeFifty() {
        i = i - 50
        return (i-50)
    }

    FORWARD.addEventListener("click", function() {
        MONSTER_CONTAINER.innerHTML = ""
        fetch(URL)
        .then(resp => resp.json())
        .then(data => data.slice(i, takeFifty()))
        .then(bitData => bitData.forEach(monster => addToPage(monster)))
    })

    BACK.addEventListener("click", function() {
        MONSTER_CONTAINER.innerHTML = ""
        fetch(URL)
        .then(resp => resp.json())
        .then(data => data.slice(removeFifty(), i))
        .then(bitData => bitData.forEach(monster => addToPage(monster)))
    })



    function addToPage(monster) {

        let monsterDiv = document.createElement('div')
        let monsterName = document.createElement('span')
        monsterName.innerText = monster.name 

        let monsterAge = document.createElement('p')
        monsterAge.innerText = monster.age 

        let monsterDes = document.createElement('p')
        monsterDes.innerText = monster.description

        monsterDiv.appendChild(monsterName)
        monsterDiv.appendChild(monsterAge)
        monsterDiv.appendChild(monsterDes)
        MONSTER_CONTAINER.appendChild(monsterDiv)
    }

})