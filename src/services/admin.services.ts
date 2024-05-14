import axios from 'axios'
import {
  doc,
  query,
  getDocs,
  orderBy,
  updateDoc,
  firestore,
  collection,
} from '@vgl/firebase'
import { ICurrentUser, IModerators } from '@vgl/types'
import { COLLECTIONS, getErrorMessage } from '@vgl/constants'
import { DocumentData, DocumentSnapshot } from 'firebase/firestore'

class Admin {
  updateAdmin = async (values = { id: '', data: {} }) => {
    const { id, data } = values as { id: string; data: ICurrentUser }
    try {
      await updateDoc(doc(firestore, COLLECTIONS.ADMIN, id), {
        ...data,
        updatedAt: new Date(),
      })
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

  getAdmins = async (): Promise<IModerators[]> => {
    try {
      const admins: IModerators[] = []
      const querySnapshot = await getDocs(
        query(
          collection(firestore, COLLECTIONS.ADMIN),
          orderBy('createdAt', 'desc')
        )
      )
      querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
        const data = doc.data() as IModerators
        if (data.status === 'inactive') return
        admins.push({
          ...data,
          id: doc.id,
          role: data.jobTitle || 'N/A',
          userImage: data.userImage || '',
          name: `${data.firstName} ${data.lastName}`,
          status: data.status === 'active' ? 'Active' : data.status || 'N/A',
        })
      })
      return admins
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)
      throw errorMessage
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

  filterAdmins = async (search: string, data: IModerators[]) => {
    if (!search) return data
    const admins: IModerators[] = []
    data.forEach((doc: IModerators) => {
      if (
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.email.toLowerCase().includes(search.toLowerCase()) ||
        doc.role.toLowerCase().includes(search.toLowerCase()) ||
        doc.status.toLowerCase().includes(search.toLowerCase())
      ) {
        admins.push(doc)
      }
    })

    return admins
  }
}

const AdminService = new Admin()

export { AdminService }
