import axios from 'axios'
import { firestore } from '@vgl/firebase'
import { ICurrentUser } from '@vgl/types'
import { doc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS, getErrorMessage } from '@vgl/constants'

class Admin {
  updateAdmin = async (values = { id: '', data: {} }) => {
    const { id, data } = values as { id: string; data: ICurrentUser }
    try {
      await updateDoc(doc(firestore, COLLECTIONS.ADMIN, id), data)
      return true
    } catch (error: any) {
      console.log('error while updating admin', error)
      throw new Error(error.message)
    }
  }

  updateAdminViaCloudFunction = async (values = { id: '', data: {} }) => {
    const { id, data: data_ } = values as { id: string; data: ICurrentUser }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_FIREBASE_URL}/updateAdmin`,

        {
          id: id,
          role: data_.role,
          email: data_.email,
          lastName: data_.lastName,
          firstName: data_.firstName,
          phoneNumber: data_.phoneNumber,
        }
      )
      // console.log('updated', data)
      return data
    } catch (error: any) {
      console.log('error while updating admin', error)
      throw error
    }
  }

  getAdmins = async () => {
    try {
      return true
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)
      return errorMessage
    }
  }

  createAdmin = async (values = { data: {} }) => {
    const { data: data_ } = values as { data: ICurrentUser }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_FIREBASE_LOCAL_URL}/createAdmin`,
        { ...data_ }
      )
      return data
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)
      return errorMessage
    }
  }

  deleteAdmin = async ({
    id,
    data,
  }: {
    id: string
    data: {
      status: string
      reason: string
    }
  }) => {
    try {
      // const { data } = await axios.post(
      //   `${import.meta.env.VITE_FIREBASE_LOCAL_URL}/deleteAdmin`,
      //   { id }
      // )
      // return data
      this.updateAdmin({ id, data: { ...data } })
      return 'Moderator Deleted'
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)
      return errorMessage
    }
  }
}

const AdminService = new Admin()

export { AdminService }
