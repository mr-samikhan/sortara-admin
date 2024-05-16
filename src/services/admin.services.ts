import axios from 'axios'
import { format } from 'date-fns'
import { COLLECTIONS, getErrorMessage } from '@vgl/constants'
import { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import {
  IActivity,
  IModerators,
  ICurrentUser,
  ICurrentStatus,
} from '@vgl/types'
import {
  doc,
  query,
  where,
  getDoc,
  getDocs,
  orderBy,
  updateDoc,
  firestore,
  collection,
} from '@vgl/firebase'

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
          permissions: data_.permissions,
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
        // if (data.status === 'inactive') return
        admins.push({
          ...data,
          id: doc.id,
          userImage: data.userImage || '',
          permissions: data.permissions || [],
          role: data.jobTitle || data.role || 'N/A',
          name: `${data.firstName} ${data.lastName}`,
          status: data.currentStatus?.status || 'N/A',
        })
      })
      return admins
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)
      throw errorMessage
    }
  }

  getAdmin = async (id: string): Promise<IModerators> => {
    try {
      const adminDoc = await getDoc(doc(firestore, COLLECTIONS.ADMIN, id))
      if (adminDoc.exists()) {
        const adminData = adminDoc.data()

        // Fetch related activities
        const activitiesQuery = query(
          collection(firestore, COLLECTIONS.ADMIN_ACTIVITIES),
          where('adminId', '==', id)
        )
        const activitiesSnapshot = await getDocs(activitiesQuery)
        const activities: IActivity[] = activitiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          ref: doc.data().ref || '',
          url: doc.data().url || '',
          title: doc.data().title || '',
          createdAt: format(
            new Date(doc.data().createdAt.toDate()),
            "MMMM do, yyyy 'at' h:mm a 'EST'"
          ) as any,
        })) as IActivity[]

        return {
          ...adminData,
          activities,
          id: adminDoc.id,
          email: adminData.email || 'N/A',
          userImage: adminData.userImage || '',
          jobTitle: adminData.jobTitle || 'N/A',
          lastName: adminData.lastName || 'N/A',
          firstName: adminData.firstName || 'N/A',
          permissions: adminData.permissions || [],
          phoneNumber: adminData.phoneNumber || 'N/A',
          role: adminData.jobTitle || adminData.role || 'N/A',
          name: `${adminData.firstName} ${adminData.lastName}`,
          status:
            adminData.status === 'active'
              ? 'Active'
              : adminData.status || 'N/A',
        }
      } else {
        throw new Error('user/not-found')
      }
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)
      throw errorMessage
    }
  }

  createAdmin = async (values = { data: {} }) => {
    const { data: data_ } = values as { data: ICurrentUser }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_FIREBASE_URL}/createAdmin`,
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
      reason: string
      currentStatus: ICurrentStatus
    }
  }) => {
    try {
      // const { data } = await axios.post(
      //   `${import.meta.env.VITE_FIREBASE_URL}/deleteAdmin`,
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

  filterAdmins = (search: string, data: IModerators[] | undefined) => {
    if (!search) return data
    const admins: IModerators[] = []
    data?.filter((doc: IModerators) => {
      if (
        doc.name?.toLowerCase().includes(search.toLowerCase()) ||
        doc.email?.toLowerCase().includes(search.toLowerCase()) ||
        doc.role?.toLowerCase().includes(search.toLowerCase()) ||
        doc.status?.toLowerCase().includes(search.toLowerCase()) ||
        doc.phoneNumber?.toLowerCase().includes(search.toLowerCase()) ||
        doc.title?.toLowerCase().includes(search.toLowerCase()) ||
        doc.description?.toLowerCase().includes(search.toLowerCase())
      ) {
        admins.push(doc)
      }
    })

    return admins
  }

  getInActiveAdmins = async (): Promise<IModerators[]> => {
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
        if (data.status === 'active' || data.status === 'Active') return
        admins.push({
          ...data,
          id: doc.id,
          reason: data.reason || 'N/A',
          userImage: data.userImage || '',
          role: data.jobTitle || data.role || 'N/A',
          name: `${data.firstName} ${data.lastName}`,
        })
      })
      return admins
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)
      throw errorMessage
    }
  }
}

const AdminService = new Admin()

export { AdminService }
