const weatherForm = document.querySelector('form')
const search = document.querySelector('inpit')
const messageOne = document.querySelector('#message-1')
const messageOne = document.querySelector('#message-2')

weatherForm.addEventListener('sumbit',(e) =>{
  e.preventDefault()

      const location = search.value

      messageOne.textContent ='loading...'
      messageTwo.textContent = ''

      fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
     })
})