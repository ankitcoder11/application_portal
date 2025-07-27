
const ApiError = async (res, statusCode, message) => {
    return res.status(statusCode).send({ message: message })
}

export { ApiError }