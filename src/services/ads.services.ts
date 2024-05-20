import { IAds } from '@vgl/types'
import { firestore } from '@vgl/firebase'
import { COLLECTIONS, getErrorMessage } from '@vgl/constants'
import {
  query,
  orderBy,
  getDocs,
  collection,
  DocumentData,
  DocumentSnapshot,
  addDoc,
} from 'firebase/firestore'

class Ads {
  getAds = async (): Promise<IAds[]> => {
    try {
      const ads: IAds[] = []
      const querySnapshot = await getDocs(
        query(
          collection(firestore, COLLECTIONS.ADS),
          orderBy('createdAt', 'desc')
        )
      )
      querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
        const data = doc.data() as IAds
        ads.push({
          ...data,
          id: doc.id,
          createdAt: new Date(
            (data.createdAt as any)?.seconds * 1000
          ).toLocaleDateString(),
          startDate: new Date(
            (data.startDate as any)?.seconds * 1000
          ).toLocaleDateString(),
          endDate: new Date(
            (data.endDate as any)?.seconds * 1000
          ).toLocaleDateString(),
        })
      })
      console.log('ads', ads)
      return ads
    } catch (error: any) {
      console.log('error while fetching ads', error)
      const errorMessage = getErrorMessage(error)
      throw errorMessage
    }
  }

  createAd = async (ad: IAds) => {
    try {
      await addDoc(collection(firestore, COLLECTIONS.ADS), {
        ...ad,
        createdAt: new Date(),
      })
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)
      throw errorMessage
    }
  }
}

const AdsServices = new Ads()

export { AdsServices }
