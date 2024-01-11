export async function fetchAllData(type, id, set, setAll) {
    const url = `http://localhost:3000/${type}/?userId=${id}`
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json()
        setAll(await data)
        set(await data)
        return true
    }
    else {
        setAll([])
        set([])
        return false
    }
}

export async function add(type,userId,newItem,setAll,setAddNew) {
    async function fectchData() {
      const url = `http://localhost:3000/${type}/?userId=${userId}`
      const response = await fetch(url)
      const data = await response.json()
      setAll(await data)
    }
    async function postNewTodo() {
      fetch(`http://localhost:3000/${type}`, {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(setAddNew(false))
        .then(fectchData())
    }
    postNewTodo()
  }
