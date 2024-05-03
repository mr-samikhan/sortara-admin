import { firestore } from '@vgl/firebase'
import { ICurrentUser } from '@vgl/types'
import { COLLECTIONS } from '@vgl/constants'
import { doc, updateDoc } from 'firebase/firestore'

class Admin {
  updateAdmin = async (values = { id: '', data: {} }) => {
    const { id, data } = values as { id: string; data: ICurrentUser }
    try {
      await updateDoc(doc(firestore, COLLECTIONS.ADMIN, id), data)
      console.log('updated', id, data)
      return true
    } catch (error: any) {
      console.log('error while updating admin', error)
      throw new Error(error.message)
    }
  }
}

const AdminService = new Admin()

export { AdminService }
