<template>
  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Add Button -->
    <div class="mb-4">
      <button
        type="button"
        class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        @click="isModalOpen = true"
      >
        Add New Data
      </button>
    </div>

    <!-- Table -->
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="border rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="item in data" :key="item.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ item.nama }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.role }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      type="button"
                      class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-green-600 hover:text-green-800 disabled:opacity-50 disabled:pointer-events-none mr-2"
                      @click="handleDetail(item.id)"
                    >
                      Detail
                    </button>
                    <button
                      type="button"
                      class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none mr-2"
                      @click="handleEdit(item)"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none"
                      @click="handleDelete(item.id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-[60] overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 py-6">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-lg bg-white shadow-lg rounded-xl dark:bg-gray-800">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
            <h3 class="font-bold text-gray-800 dark:text-white">
              {{ isEditing ? 'Edit Data' : 'Add New Data' }}
            </h3>
            <button
              type="button"
              class="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              @click="closeModal"
            >
              <span class="sr-only">Close</span>
              <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-4">
            <div class="grid gap-4">
              <!-- Name Input -->
              <div>
                <label for="name" class="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Name</label>
                <div class="relative">
                  <input
                    type="text"
                    id="name"
                    v-model="formData.nama"
                    class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Enter name"
                  >
                </div>
              </div>

              <!-- Email Input -->
              <div>
                <label for="email" class="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Email</label>
                <div class="relative">
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Enter email"
                  >
                </div>
              </div>

              <!-- Role Input -->
              <div>
                <label for="role" class="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Role</label>
                <div class="relative">
                  <select
                    id="role"
                    v-model="formData.role"
                    class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  >
                    <option value="">Select role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
            <button
              type="button"
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              @click="handleSubmit"
            >
              {{ isEditing ? 'Update' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '@/composables/useApi'
const { fetchUsers, addUser, updateUser, deleteUser } = useApi()
const data = ref([])

onMounted(async () => {
  try {
    console.log('Memulai fetch data...')
    const result = await fetchUsers()
    console.log('Response dari API:', result)
    if (result) {
      data.value = result.data
      console.log('Data berhasil diupdate:', data.value)
    }
  } catch (error) {
    console.error('Error detail:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
  }
})
const isModalOpen = ref(false)
const isEditing = ref(false)
const formData = ref({
  id: 0,
  nama: '',
  email: '',
  role: ''
})

const fetchData = async () => {
  try {
    console.log('Memulai fetch data...')
    const result = await fetchUsers()
    console.log('Response dari API:', result)
    if (result) {
      data.value = result.data
      console.log('Data berhasil diupdate:', data.value)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      console.log('Updating user with data:', formData.value)
      // Panggil API untuk update data
      await updateUser(formData.value)
      
      // Refresh data setelah update berhasil
      await fetchData()
      
      // Tampilkan pesan sukses
      alert('Data berhasil diperbarui')
    } else {
      // Logika untuk menambah data baru
      console.log('Adding new user with data:', formData.value)
      await addUser(formData.value)
      await fetchData()
      // Tampilkan pesan sukses
      alert('Data berhasil ditambahkan')
    }
    
    // Reset form dan tutup modal
    isModalOpen.value = false
    resetForm()
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Terjadi kesalahan saat menyimpan data')
  }
}

const resetForm = () => {
  formData.value = { 
    id: 0, 
    nama: '', 
    email: '', 
    role: '' 
  }
  isEditing.value = false
}

const handleDelete = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
    try {
      await deleteUser(id)
      // Refresh the data after deletion
      const result = await fetchUsers()
      data.value = result.data // Sesuaikan dengan format response API
    } catch (error) {
      console.error('Error:', error)
      // Tambahkan penanganan error UI disini jika diperlukan
    }
  }
}

const handleEdit = (item) => {
  formData.value = { 
    ...item // Ini adalah fungsi spread operator untuk menyalin semua properti dari objek item
  }
  isEditing.value = true
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  formData.value = { 
    id: 0, 
    nama: '', 
    email: '', 
    role: '' 
  }
  isEditing.value = false
}

const handleDetail = (id) => {
  // Cari item berdasarkan id
  const item = data.value.find(item => item.id === id)
  if (item) {
    console.log('Detail item:', item)
    // Implementasi tampilan detail
    // Contoh: navigasi ke halaman detail atau buka modal detail
  } else {
    console.error('Item not found')
  }
}
</script> 