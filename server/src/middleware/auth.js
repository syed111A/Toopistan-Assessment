import jwt from 'jsonwebtoken'

function requireAdmin(request, response, next) {
  const authorization = request.get('authorization')
  const [scheme, token] = authorization?.split(' ') || []

  if (scheme !== 'Bearer' || !token) {
    return response.status(401).json({
      success: false,
      message: 'Authentication required.',
      data: null,
    })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    if (payload.role !== 'admin') {
      throw new Error('Token does not belong to an admin.')
    }

    request.admin = payload
    return next()
  } catch {
    return response.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
      data: null,
    })
  }
}

export default requireAdmin
