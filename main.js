const BASE_URL = 'http://localhost:2000'

let mode = 'CREATE' 
let selectedId = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    console.log('id', id)
    if (id) {
        mode = 'EDIT'
        selectedId = id
        
        try {
           const response = await axios.get(`${BASE_URL}/Tasking/${id}`)
           const inv = response.data
        
        let TaskDDOM = document.querySelector('input[name=task]')
        let DesDOM = document.querySelector('input[name=description]')
        let DateDOM = document.querySelector('input[name=due_date]')
        

        TaskDDOM.value = inv.task
        DesDOM.value = inv.description
        DateDOM.value = inv.due_date
        

        for (let i = 0; i < DateDOM.length; i++) {
            if (DateDOM[i].value == user.stats) {
                DateDOM[i].checked = true
            }

        }
        }catch (error){
            console.log('error',error)
        }
         
    }
}

const validateData = (TaskData) => {
    let errors = []
        if (!TaskData.title) {
          errors.push('กรุณากรอกชื่อ')
        }
        if (!TaskData.description || null) {
          errors.push('กรุณากรอกรายละเอียด')
        }
        if (!TaskData.status) {
          errors.push('กรุณากรอกสถานะ')
        }
        if (!TaskData.due_date || null) {
            errors.push('กรุณากรอกวันที่')
        }
      
      return errors
  }

const AddTask= async () => {
    let TaskDDOM = document.querySelector('input[name=task]')
    let DesDOM = document.querySelector('input[name=description]')
    let DateDOM = document.querySelector('input[name=due_date]')
    let messageDOM = document.getElementById('message')

    

    try {

    console.log('test')
    let invData = {
        task: TaskDDOM.value,
        description: DesDOM.value,
        due_date: DateDOM.value,
    }
    console.log('submitData',invData)
 
         let message = 'บันทึกข้อมูลเรียบร้อยแล้ว'
         if(mode == 'CREATE'){
            const response = await axios.post(`${BASE_URL}/tasking`, invData)
            console.log('response',response.data)
         }else {
            const response = await axios.put(`${BASE_URL}/tasking/${selectedId}`, invData)
            message = 'แก้ไขข้อมูลเรียบร้อยแล้ว'
            console.log('response',response.data) 
        }
        
        messageDOM.innerText = message                 
        messageDOM.className = 'message success'
    }catch (error){
        console.log('error message',error.message)
        console.log('error',error.errors)

    if (error.response) {
        console.log(error.response)
        error.message = error.response.data.message
        error.errors = error.response.data.errors
      }

    let htmlData ='<div>'
    htmlData += `<div>${error.message}</div>`
    for (let i = 0; i < error.errors.length; i++) {
    htmlData += `<li>${error.errors[i]}</li>`
    }
    htmlData += '</div>'


    messageDOM.innerHTML = htmlData
    messageDOM.className = 'message danger'   
    }
}
