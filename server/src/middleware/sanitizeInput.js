const blockedKeys = new Set(['__proto__', 'constructor', 'prototype'])

function hasUnsafeKeys(value) {
  if (Array.isArray(value)) {
    return value.some(hasUnsafeKeys)
  }

  if (!value || typeof value !== 'object') {
    return false
  }

  return Object.entries(value).some(
    ([key, child]) =>
      key.startsWith('$') ||
      key.includes('.') ||
      blockedKeys.has(key) ||
      hasUnsafeKeys(child),
  )
}

function sanitizeInput(request, response, next) {
  if (hasUnsafeKeys(request.body)) {
    return response.status(400).json({
      success: false,
      message: 'Request contains unsupported field names.',
      data: null,
    })
  }

  return next()
}

export default sanitizeInput
