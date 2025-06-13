import Joi from 'joi'


/**
 * Middleware untuk validasi request body/path/query parameters
 * @param {Joi.Schema} schema - Skema validasi Joi
 * @returns {Function} Middleware function
 */
export const validate = (schema) => (req, res, next) => {
  const options = {
    abortEarly: false, // Mengembalikan semua error sekaligus
    allowUnknown: true, // Mengizinkan field yang tidak didefinisikan di schema
    stripUnknown: true // Menghapus field yang tidak didefinisikan
  }

  // Validasi semua bagian request yang mungkin
  const { error, value } = schema.validate(
    {
      body: req.body,
      query: req.query,
      params: req.params
    },
    options
  )

  if (error) {
    const errorDetails = error.details.map(detail => ({
      field: detail.context.key,
      message: detail.message.replace(/['"]/g, ''),
      type: detail.type
    }))

    throw new BadRequestError('Validasi gagal', {
      details: errorDetails
    })
  }

  // Assign nilai yang sudah divalidasi ke request
  req.body = value.body || {}
  req.query = value.query || {}
  req.params = value.params || {}

  next()
}

/**
 * Middleware untuk validasi Object ID (misal MongoDB ID)
 * Biasanya digunakan untuk validasi path parameter
 */
export const validateId = (req, res, next) => {
  const idSchema = Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
  const { error } = idSchema.validate(req.params.id)

  if (error) {
    throw new BadRequestError('ID tidak valid')
  }

  next()
}