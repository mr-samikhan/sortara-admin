const cors = require('cors')({ origin: true })
import { COLLECTIONS } from '../../constant'
import { CreateAdminDto } from '../../types'
import { auth, firestore } from 'firebase-admin'
import { Request, Response, https } from 'firebase-functions'

export const createAdmin = () =>
  https.onRequest(async (request: Request, response: Response) => {
    cors(request, response, async () => {
      try {
        const {
          role,
          email,
          lastName,
          password,
          jobTitle,
          firstName,
          phoneNumber,
          permissions,
        } = request.body as CreateAdminDto

        if (!email)
          response
            .status(400)
            .json({ success: false, message: 'Email field is required' })

        if (!role)
          response.status(400).json({
            success: false,
            message: 'Role field is required',
          })

        if (!password)
          response.status(400).json({
            success: false,
            message: 'Password field is required',
          })

        if (!firstName)
          response.status(400).json({
            success: false,
            message: 'First Name field is required',
          })
        if (!lastName)
          response.status(400).json({
            success: false,
            message: 'Last Name field is required',
          })

        const user = await auth().createUser({
          email,
          password,
          disabled: false,
          emailVerified: true,
        })

        await firestore()
          .doc(`/${COLLECTIONS.ADMINS}/${user.uid}`)
          .create({
            role,
            email,
            lastName,
            jobTitle,
            firstName,
            phoneNumber,
            uid: user.uid,
            joinedAt: new Date(),
            createdAt: new Date(),
            permissions: permissions || [],
          })

        response.send(`${firstName} ${lastName} account has been created!`)
      } catch (error: any) {
        console.log('error while creating admin', error)
        response.status(500).json({ error: error.message })
      }
    })
  })
