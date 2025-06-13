import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prisma.js'
import config from '../config/config.js'

export const loginAdmin = async (username, password) => {
  const admin = await prisma.admin.findUnique({ where: { username } })
  
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    throw new Error('Kredensial admin tidak valid')
  }

  const token = jwt.sign(
    { sub: admin.id, role: 'admin' },
    config.jwt.secret,
    { expiresIn: config.jwt.adminExpires }
  )

  return { token, admin: { id: admin.id, username: admin.username } }
}

export const loginUser = async (usernameOrEmail, password) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ]
    }
  })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Kredensial user tidak valid')
  }

  const token = jwt.sign(
    { sub: user.id, role: 'user' },
    config.jwt.secret,
    { expiresIn: config.jwt.userExpires }
  )

  return { 
    token,
    user: {
      id: user.id,
      username: user.username,
      name: user.name
    }
  }
}