const cors = require('cors')({ origin: true })
import { UpdateAdminDto } from '../../types'
import { COLLECTIONS } from '../../constant'
import { auth, firestore } from 'firebase-admin'
import { Request, Response, https } from 'firebase-functions'

export const updateAdmin = () =>
  https.onRequest(async (request: Request, response: Response) => {
    cors(request, response, async () => {
      try {
        const { id, email, firstName, lastName, role, phoneNumber } =
          request.body as UpdateAdminDto

        if (!email)
          response
            .status(400)
            .json({ success: false, message: 'Email field is required' })

        if (!role)
          response.status(400).json({
            success: false,
            message: 'Role field is required',
          })

        if (!id)
          response.status(400).json({
            success: false,
            message: 'ID field is required',
          })

        if (!firstName)
          response.status(400).json({
            success: false,
            message: 'firstName field is required',
          })
        if (!lastName)
          response.status(400).json({
            success: false,
            message: 'lastName field is required',
          })

        const user = await auth().updateUser(id, {
          email,
        })

        await firestore()
          .doc(`/${COLLECTIONS.ADMINS}/${user.uid}`)
          .update({
            role,
            email,
            firstName,
            lastName,
            phoneNumber: phoneNumber || '',
          })

        response.send(`${firstName} ${lastName} account has been updated!`)
      } catch (error: any) {
        response.status(500).send({ error: error })
      }
    })
  })
