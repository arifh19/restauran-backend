const response = (success, code, message, data) => {
    template = {
        "success": success,
        "code": code,
        "message": message,
        "data": data || {}
    }
    return template
}

module.exports = response