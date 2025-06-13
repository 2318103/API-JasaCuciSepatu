import { loginAdmin, loginUser } from '../services/auth.js'

export const loginAdminController = async (req, res) => {
  try {
    const { token, admin } = await loginAdmin(
      req.body.username,
      req.body.password
    )
    res.json({ token, admin })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}

export const loginUserController = async (req, res) => {
  try {
    const { token, user } = await loginUser(
      req.body.usernameOrEmail,
      req.body.password
    )
    res.json({ token, user })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}