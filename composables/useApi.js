export function useApi() {
  const BASE_URL = 'http://localhost:3001/api' // sesuaikan dengan URL API Anda

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in fetchUsers:', error)
      throw error
    }
  }

  const addUser = async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      return await response.json()
    } catch (error) {
      console.error('Error adding user:', error)
      throw error
    }
  }

  const updateUser = async (userData) => {
    try {
      console.log('Sending update request for user:', userData)
      const response = await fetch(`${BASE_URL}/users/${userData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const updatedData = await response.json()
      console.log('Update response:', updatedData)
      return updatedData
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  const deleteUser = async (id) => {
    try {
      await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }

  return {
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  }
} 