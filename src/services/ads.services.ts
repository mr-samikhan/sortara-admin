import { IAds } from '@vgl/types'
import { COLLECTIONS, getErrorMessage } from '@vgl/constants'
import {
  DocumentData,
  DocumentSnapshot,
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import { firestore } from '@vgl/firebase'

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
            data.createdAt.seconds * 1000
          ).toLocaleDateString(),
          startDate: new Date(
            data.startDate.seconds * 1000
          ).toLocaleDateString(),
          endDate: new Date(data.endDate.seconds * 1000).toLocaleDateString(),
        })
      })
      console.log('ads', ads)
      return ads
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)
      throw errorMessage
    }
  }
}

const AdsServices = new Ads()

export { AdsServices }
